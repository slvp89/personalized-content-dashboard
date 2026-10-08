"use client";

import React, { useState } from "react";
import { FilterBar } from "@/components/feed/FilterBar";
import { FeedContainer } from "@/components/feed/FeedContainer";
import { LiveNotificationBanner } from "@/components/feed/LiveNotificationBanner";
import { ContentItem } from "@/types/content";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchFeedContent } from "@/store/slices/contentSlice";

interface PersonalizedFeedProps {
  onOpenModal: (item: ContentItem) => void;
  onOpenSettings: () => void;
}

export const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({
  onOpenModal,
  onOpenSettings,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.content.items);
  const status = useAppSelector((state) => state.content.status);
  const activeType = useAppSelector((state) => state.content.activeType);
  const activeCategory = useAppSelector((state) => state.content.activeCategory);
  const searchQuery = useAppSelector((state) => state.content.searchQuery);
  const userCategories = useAppSelector((state) => state.preferences.categories);

  const [isDragEnabled, setIsDragEnabled] = useState(false);

  // Filter items in memory according to active filters
  const filteredItems = items.filter((item) => {
    // 1. Content type filter
    if (activeType !== "all" && item.type !== activeType) return false;

    // 2. Category filter
    if (activeCategory !== "all") {
      if (item.category !== activeCategory) return false;
    } else {
      // Must match one of user preferred categories
      if (!userCategories.includes(item.category)) return false;
    }

    // 3. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      const matchSource = item.source.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchTags && !matchSource) return false;
    }

    return true;
  });

  const handleLoadMore = () => {
    dispatch(
      fetchFeedContent({
        categories: userCategories,
        type: activeType,
        query: searchQuery,
        append: true,
      })
    );
  };

  return (
    <div className="w-full">
      <FilterBar
        isDragEnabled={isDragEnabled}
        onToggleDrag={() => setIsDragEnabled(!isDragEnabled)}
        onOpenSettings={onOpenSettings}
      />

      <LiveNotificationBanner />

      <FeedContainer
        items={filteredItems}
        isLoading={status === "loading"}
        onOpenModal={onOpenModal}
        isDragEnabled={isDragEnabled}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};
