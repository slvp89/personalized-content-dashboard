"use client";

import React, { useState } from "react";
import { ContentCard } from "@/components/cards/ContentCard";
import { ContentItem } from "@/types/content";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearFavorites } from "@/store/slices/favoritesSlice";
import { translations } from "@/lib/i18n";
import {
  Bookmark,
  Search,
  Download,
  Trash2,
  FolderHeart,
} from "lucide-react";

interface FavoritesSectionProps {
  onOpenModal: (item: ContentItem) => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  onOpenModal,
}) => {
  const dispatch = useAppDispatch();
  const allItems = useAppSelector((state) => state.content.items);
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const favoriteItems = allItems.filter((i) => favoriteIds.includes(i.id));

  const filteredFavorites = favoriteItems.filter((item) => {
    if (selectedType !== "all" && item.type !== selectedType) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(favoriteItems, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `pulsedesk-favorites-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Bookmark className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>{t.navFavorites}</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                {favoriteItems.length}
              </span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Your curated archive of must-read articles, media recommendations, and bookmarks
            </p>
          </div>
        </div>

        {/* Action buttons */}
        {favoriteItems.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-indigo-400 text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
              title="Export favorites as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("Are you sure you want to clear all favorites?")) {
                  dispatch(clearFavorites());
                }
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-rose-400 text-slate-500 hover:text-rose-500 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      {favoriteItems.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search in favorites..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto">
            {["all", "news", "recommendation", "social"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {type === "recommendation" ? "Media" : type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Favorites Grid */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onOpenModal={onOpenModal}
              isDragEnabled={false}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
          <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500 mb-4">
            <FolderHeart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1">
            {t.favoritesEmpty}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            {t.favoritesEmptyDesc}
          </p>
        </div>
      )}
    </div>
  );
};
