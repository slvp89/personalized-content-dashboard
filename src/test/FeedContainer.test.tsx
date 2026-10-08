import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { FeedContainer } from "@/components/feed/FeedContainer";
import contentReducer from "@/store/slices/contentSlice";
import preferencesReducer from "@/store/slices/preferencesSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import analyticsReducer from "@/store/slices/analyticsSlice";
import { ContentItem } from "@/types/content";

const createMockStore = () =>
  configureStore({
    reducer: {
      content: contentReducer,
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      analytics: analyticsReducer,
    },
  });

const mockItems: ContentItem[] = [
  {
    id: "item-1",
    type: "news",
    title: "Item 1 Headline",
    summary: "Summary for item 1",
    category: "technology",
    publishedAt: new Date().toISOString(),
    source: "Source 1",
    url: "https://example.com/1",
    likes: 10,
    tags: ["Tech"],
    author: "Alice",
    readingTimeMinutes: 3,
  },
  {
    id: "item-2",
    type: "social",
    title: "Item 2 Headline",
    summary: "Summary for item 2",
    category: "science",
    publishedAt: new Date().toISOString(),
    source: "Source 2",
    url: "https://example.com/2",
    likes: 20,
    tags: ["Science"],
    authorName: "Bob",
    authorHandle: "@bob",
    authorAvatar: "https://example.com/avatar.jpg",
    verified: true,
    retweets: 5,
    replies: 2,
    hashtags: ["Science"],
  },
];

describe("FeedContainer Component", () => {
  it("renders empty state when items list is empty", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <FeedContainer
          items={[]}
          isLoading={false}
          onOpenModal={vi.fn()}
          isDragEnabled={false}
        />
      </Provider>
    );

    expect(screen.getByText("No matching items found")).toBeInTheDocument();
  });

  it("renders content cards when items are provided", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <FeedContainer
          items={mockItems}
          isLoading={false}
          onOpenModal={vi.fn()}
          isDragEnabled={false}
        />
      </Provider>
    );

    expect(screen.getByText("Item 1 Headline")).toBeInTheDocument();
    expect(screen.getByText("Item 2 Headline")).toBeInTheDocument();
  });
});
