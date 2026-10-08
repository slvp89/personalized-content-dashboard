"use client";

import React, { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { ContentItem } from "@/types/content";
import { ContentCard } from "@/components/cards/ContentCard";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { reorderItems } from "@/store/slices/contentSlice";
import { translations } from "@/lib/i18n";
import { ArrowDownCircle, ChevronLeft, ChevronRight, Inbox } from "lucide-react";

interface FeedContainerProps {
  items: ContentItem[];
  isLoading: boolean;
  onOpenModal: (item: ContentItem) => void;
  isDragEnabled: boolean;
  onLoadMore?: () => void;
}

export const FeedContainer: React.FC<FeedContainerProps> = ({
  items,
  isLoading,
  onOpenModal,
  isDragEnabled,
  onLoadMore,
}) => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector((state) => state.preferences.layout);
  const feedMode = useAppSelector((state) => state.preferences.feedMode);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  // Local state for smooth Framer Motion reordering
  const [orderedItems, setOrderedItems] = useState<ContentItem[]>(items);

  useEffect(() => {
    setOrderedItems(items);
  }, [items]);

  const handleReorder = (newOrder: ContentItem[]) => {
    setOrderedItems(newOrder);
    dispatch(reorderItems(newOrder.map((item) => item.id)));
  };

  // Pagination for paginated mode
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = layout === "compact" ? 12 : 6;
  const totalPages = Math.ceil(orderedItems.length / itemsPerPage) || 1;
  const paginatedItems = feedMode === "paginated"
    ? orderedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : orderedItems;

  if (isLoading && orderedItems.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (orderedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
        <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500 mb-4">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1">
          {t.noResults}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          {t.noResultsDesc}
        </p>
      </div>
    );
  }

  // Grid classes according to user layout density preference
  const gridClass =
    layout === "list"
      ? "grid grid-cols-1 gap-5 max-w-3xl mx-auto"
      : layout === "compact"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <div className="w-full space-y-8">
      {/* Reorderable mode with Framer Motion Reorder.Group */}
      {isDragEnabled ? (
        <Reorder.Group
          axis="y"
          values={orderedItems}
          onReorder={handleReorder}
          className="space-y-4 max-w-3xl mx-auto"
        >
          {orderedItems.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              className="relative cursor-grab active:cursor-grabbing"
              whileDrag={{ scale: 1.02, zIndex: 40 }}
            >
              <ContentCard
                item={item}
                onOpenModal={onOpenModal}
                isDragEnabled={true}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <div className={gridClass}>
          {paginatedItems.map((item) => (
            <div key={item.id} className="h-full">
              <ContentCard
                item={item}
                onOpenModal={onOpenModal}
                isDragEnabled={false}
              />
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Load More Button */}
      {feedMode === "infinite" && !isDragEnabled && (
        <div className="flex justify-center pt-4 pb-6">
          <button
            type="button"
            onClick={onLoadMore}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all"
          >
            <ArrowDownCircle className="w-4 h-4 text-indigo-500" />
            <span>{t.loadMore}</span>
          </button>
        </div>
      )}

      {/* Pagination Mode Controls */}
      {feedMode === "paginated" && !isDragEnabled && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-500 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
