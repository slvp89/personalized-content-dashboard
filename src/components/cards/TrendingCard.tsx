"use client";

import React from "react";
import { TrendingItem, ContentItem } from "@/types/content";
import { Badge } from "@/components/common/Badge";
import { TrendingUp, Flame } from "lucide-react";
import { formatNumberCompact } from "@/lib/utils";

interface TrendingCardProps {
  trendingItem: TrendingItem;
  onOpenModal: (item: ContentItem) => void;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({
  trendingItem,
  onOpenModal,
}) => {
  const { item, rank, velocity } = trendingItem;

  const isTopThree = rank <= 3;
  const rankColors = [
    "from-amber-500 to-yellow-400 text-white shadow-amber-500/20",
    "from-slate-400 to-slate-300 text-slate-900 shadow-slate-400/20",
    "from-amber-700 to-amber-600 text-white shadow-amber-700/20",
  ];

  return (
    <div
      onClick={() => onOpenModal(item)}
      className="group relative flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer backdrop-blur"
    >
      {/* Rank Number Badge */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shadow-md ${
          isTopThree
            ? `bg-gradient-to-br ${rankColors[rank - 1]}`
            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
        }`}
      >
        #{rank}
      </div>

      {/* Thumbnail */}
      {item.imageUrl && (
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* Content Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Badge type={item.type}>{item.type}</Badge>
          <Badge category={item.category}>{item.category}</Badge>
          <span className="text-[11px] font-semibold text-rose-500 flex items-center gap-0.5">
            <Flame className="w-3 h-3 fill-rose-500" />
            {velocity}
          </span>
        </div>

        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 mb-1">
          {item.title}
        </h4>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
          {item.summary}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1 font-medium text-indigo-500">
            <TrendingUp className="w-3.5 h-3.5" />
            {formatNumberCompact(trendingItem.trendingScore)} pts
          </span>
          <span>•</span>
          <span>{item.source}</span>
        </div>
      </div>
    </div>
  );
};
