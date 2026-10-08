import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ContentCard } from "@/components/cards/ContentCard";
import contentReducer from "@/store/slices/contentSlice";
import preferencesReducer from "@/store/slices/preferencesSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import analyticsReducer from "@/store/slices/analyticsSlice";
import { NewsItem, RecommendationItem } from "@/types/content";

const createMockStore = () =>
  configureStore({
    reducer: {
      content: contentReducer,
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      analytics: analyticsReducer,
    },
  });

const mockNews: NewsItem = {
  id: "test-news-1",
  type: "news",
  title: "Superconducting Qubits Advance",
  summary: "A breakthrough in coherence times for cryogenic computation.",
  category: "technology",
  publishedAt: new Date().toISOString(),
  source: "Tech Journal",
  url: "https://example.com/news",
  likes: 42,
  tags: ["Quantum", "Hardware"],
  author: "Dr. Evelyn Reed",
  readingTimeMinutes: 4,
};

describe("ContentCard Component", () => {
  it("renders news card details accurately", () => {
    const store = createMockStore();
    const handleOpenModal = vi.fn();

    render(
      <Provider store={store}>
        <ContentCard item={mockNews} onOpenModal={handleOpenModal} />
      </Provider>
    );

    expect(screen.getByText("Superconducting Qubits Advance")).toBeInTheDocument();
    expect(screen.getByText("4 min read")).toBeInTheDocument();
    expect(screen.getByText("Dr. Evelyn Reed")).toBeInTheDocument();
  });

  it("handles favorite bookmark toggling", () => {
    const store = createMockStore();
    const handleOpenModal = vi.fn();

    render(
      <Provider store={store}>
        <ContentCard item={mockNews} onOpenModal={handleOpenModal} />
      </Provider>
    );

    const bookmarkBtn = screen.getByTitle("Bookmark");
    fireEvent.click(bookmarkBtn);

    expect(store.getState().favorites.favoriteIds).toContain("test-news-1");
  });

  it("triggers like incrementation on like button click", () => {
    const store = createMockStore();
    const handleOpenModal = vi.fn();

    render(
      <Provider store={store}>
        <ContentCard item={mockNews} onOpenModal={handleOpenModal} />
      </Provider>
    );

    const likeBtn = screen.getByTitle("Like");
    fireEvent.click(likeBtn);

    expect(store.getState().analytics.likedIds).toContain("test-news-1");
  });

  it("calls onOpenModal when clicking read CTA", () => {
    const store = createMockStore();
    const handleOpenModal = vi.fn();

    render(
      <Provider store={store}>
        <ContentCard item={mockNews} onOpenModal={handleOpenModal} />
      </Provider>
    );

    const ctaBtn = screen.getByText("Read Article");
    fireEvent.click(ctaBtn);

    expect(handleOpenModal).toHaveBeenCalledWith(mockNews);
  });
});
