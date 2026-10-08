import { describe, it, expect } from "vitest";
import favoritesReducer, {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  clearFavorites,
} from "@/store/slices/favoritesSlice";

describe("favoritesSlice", () => {
  it("should initialize with empty favorites", () => {
    const state = favoritesReducer(undefined, { type: "@@INIT" });
    expect(state.favoriteIds).toEqual([]);
  });

  it("should add item on toggleFavorite when not present", () => {
    const state = favoritesReducer(undefined, toggleFavorite("news-1"));
    expect(state.favoriteIds).toContain("news-1");
  });

  it("should remove item on toggleFavorite when already present", () => {
    const initialState = { favoriteIds: ["news-1", "rec-2"] };
    const nextState = favoritesReducer(initialState, toggleFavorite("news-1"));
    expect(nextState.favoriteIds).not.toContain("news-1");
    expect(nextState.favoriteIds).toContain("rec-2");
  });

  it("should add and remove favorites via explicit actions", () => {
    let state = favoritesReducer(undefined, addFavorite("soc-3"));
    expect(state.favoriteIds).toContain("soc-3");

    state = favoritesReducer(state, removeFavorite("soc-3"));
    expect(state.favoriteIds).not.toContain("soc-3");
  });

  it("should clear all favorites", () => {
    const initialState = { favoriteIds: ["news-1", "rec-2", "soc-3"] };
    const state = favoritesReducer(initialState, clearFavorites());
    expect(state.favoriteIds).toEqual([]);
  });
});
