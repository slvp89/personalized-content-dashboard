"use client";

import React, { useState } from "react";
import { TrendingCard } from "@/components/cards/TrendingCard";
import { ContentItem, TrendingItem } from "@/types/content";
import { useAppSelector } from "@/store";
import { Flame } from "lucide-react";

interface TrendingSectionProps {
  onOpenModal: (item: ContentItem) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  onOpenModal,
}) => {
  const items = useAppSelector((state) => state.content.items);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Derive top trending sorted by likes
  let sortedItems = [...items].sort((a, b) => b.likes - a.likes);

  if (selectedCategory !== "all") {
    sortedItems = sortedItems.filter((i) => i.category === selectedCategory);
  }

  const velocities = [
    "+72% this hour",
    "+54% today",
    "+41% this hour",
    "+33% today",
    "+26% today",
    "+19% this hour",
    "+16% today",
    "+12% today",
  ];

  const trendingList: TrendingItem[] = sortedItems.slice(0, 8).map((item, index) => ({
    item,
    rank: index + 1,
    trendingScore: Math.round(item.likes * 1.5 + (10 - index) * 150),
    velocity: velocities[index % velocities.length],
  }));

  const categories = ["all", "technology", "business", "science", "entertainment", "gaming"];

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border border-rose-500/20 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Trending Radar</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                  LIVE
                </span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Top viral stories, breakout media recommendations, and high-velocity conversations
              </p>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                    : "bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-300"
                }`}
              >
                {cat === "all" ? "Top Viral" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {trendingList.map((trendingItem) => (
          <TrendingCard
            key={trendingItem.item.id}
            trendingItem={trendingItem}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </div>
  );
};
