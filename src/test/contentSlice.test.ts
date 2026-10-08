import { describe, it, expect } from "vitest";
import contentReducer, {
  setActiveType,
  setActiveCategory,
  setSearchQuery,
  reorderItems,
  resetOrder,
  receiveLiveItem,
  applyPendingLiveItems,
  incrementLike,
} from "@/store/slices/contentSlice";
import { mockContentDataset } from "@/lib/mockData";
import { ContentItem } from "@/types/content";

describe("contentSlice", () => {
  it("should initialize with default items and status", () => {
    const state = contentReducer(undefined, { type: "@@INIT" });
    expect(state.items.length).toBeGreaterThan(0);
    expect(state.status).toBe("succeeded");
    expect(state.activeType).toBe("all");
    expect(state.activeCategory).toBe("all");
    expect(state.searchQuery).toBe("");
  });

  it("should update activeType and activeCategory filters", () => {
    let state = contentReducer(undefined, setActiveType("news"));
    expect(state.activeType).toBe("news");

    state = contentReducer(state, setActiveCategory("technology"));
    expect(state.activeCategory).toBe("technology");
  });

  it("should update searchQuery", () => {
    const state = contentReducer(undefined, setSearchQuery("quantum"));
    expect(state.searchQuery).toBe("quantum");
  });

  it("should reorder items according to custom order IDs", () => {
    const state = contentReducer(undefined, { type: "@@INIT" });
    const originalFirstId = state.items[0].id;
    const originalSecondId = state.items[1].id;

    // Swap first two items
    const reversedIds = [originalSecondId, originalFirstId, ...state.items.slice(2).map((i) => i.id)];
    const reorderedState = contentReducer(state, reorderItems(reversedIds));

    expect(reorderedState.items[0].id).toBe(originalSecondId);
    expect(reorderedState.items[1].id).toBe(originalFirstId);
    expect(reorderedState.customOrder).toEqual(reversedIds);
  });

  it("should reset custom order and sort chronologically", () => {
    const state = contentReducer(undefined, { type: "@@INIT" });
    const newestItem = [...state.items].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )[0];

    const reversedIds = [...state.items].reverse().map((i) => i.id);
    let modifiedState = contentReducer(state, reorderItems(reversedIds));
    expect(modifiedState.customOrder.length).toBeGreaterThan(0);

    modifiedState = contentReducer(modifiedState, resetOrder());
    expect(modifiedState.customOrder).toEqual([]);
    expect(modifiedState.items[0].id).toBe(newestItem.id);
  });

  it("should increment like counter for a specific item", () => {
    const state = contentReducer(undefined, { type: "@@INIT" });
    const targetItem = state.items[0];
    const initialLikes = targetItem.likes;

    const nextState = contentReducer(state, incrementLike(targetItem.id));
    const updatedItem = nextState.items.find((i) => i.id === targetItem.id);
    expect(updatedItem?.likes).toBe(initialLikes + 1);
  });

  it("should handle live incoming items and apply pending items to the top", () => {
    const state = contentReducer(undefined, { type: "@@INIT" });
    const fakeLiveItem: ContentItem = {
      id: "live-test-1",
      type: "news",
      title: "Live Breakthrough Testing",
      summary: "Testing real-time feed update delivery",
      category: "technology",
      publishedAt: new Date().toISOString(),
      source: "TechWire",
      url: "https://techwire.com",
      likes: 10,
      tags: ["Live"],
      author: "Test Reporter",
      readingTimeMinutes: 2,
    };

    let nextState = contentReducer(state, receiveLiveItem(fakeLiveItem));
    expect(nextState.pendingLiveItems).toContainEqual(fakeLiveItem);

    // Apply pending items
    nextState = contentReducer(nextState, applyPendingLiveItems());
    expect(nextState.pendingLiveItems).toEqual([]);
    expect(nextState.items[0].id).toBe("live-test-1");
  });
});
