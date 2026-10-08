"use client";

import React from "react";
import {
  Layers,
  Newspaper,
  Film,
  MessageSquare,
  GripVertical,
  RotateCcw,
  LayoutGrid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { ContentType } from "@/types/content";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setActiveType,
  setActiveCategory,
  resetOrder,
} from "@/store/slices/contentSlice";
import { setLayout } from "@/store/slices/preferencesSlice";
import { translations } from "@/lib/i18n";

interface FilterBarProps {
  isDragEnabled: boolean;
  onToggleDrag: () => void;
  onOpenSettings: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  isDragEnabled,
  onToggleDrag,
  onOpenSettings,
}) => {
  const dispatch = useAppDispatch();
  const activeType = useAppSelector((state) => state.content.activeType);
  const activeCategory = useAppSelector((state) => state.content.activeCategory);
  const customOrder = useAppSelector((state) => state.content.customOrder);
  const userCategories = useAppSelector((state) => state.preferences.categories);
  const layout = useAppSelector((state) => state.preferences.layout);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  const typeTabs: { type: ContentType | "all"; label: string; icon: React.ReactNode }[] = [
    { type: "all", label: t.filterAll, icon: <Layers className="w-4 h-4" /> },
    { type: "news", label: t.filterNews, icon: <Newspaper className="w-4 h-4" /> },
    {
      type: "recommendation",
      label: t.filterRecommendations,
      icon: <Film className="w-4 h-4" />,
    },
    { type: "social", label: t.filterSocial, icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full space-y-4 mb-6">
      {/* Top Controls: Type Tabs + Action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Content Type Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl backdrop-blur-sm overflow-x-auto max-w-full">
          {typeTabs.map((tab) => {
            const isActive = activeType === tab.type;
            return (
              <button
                key={tab.type}
                type="button"
                onClick={() => dispatch(setActiveType(tab.type))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right side tools: Drag Toggle, Layout density, Settings */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Drag & Drop Reorder Toggle */}
          <button
            type="button"
            onClick={onToggleDrag}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isDragEnabled
                ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:border-indigo-400"
            }`}
            title="Enable card drag-and-drop reordering"
          >
            <GripVertical className="w-3.5 h-3.5" />
            <span>{isDragEnabled ? "Done Reordering" : "Reorder Cards"}</span>
          </button>

          {/* Reset custom order if active */}
          {customOrder.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(resetOrder())}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t.resetOrder}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.resetOrder}</span>
            </button>
          )}

          {/* Layout density switch */}
          <div className="hidden sm:flex items-center p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl">
            <button
              type="button"
              onClick={() => dispatch(setLayout("grid"))}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                layout === "grid"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => dispatch(setLayout("list"))}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                layout === "list"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
              title="List view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Settings button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.customizeFeed}</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar (Filtered by user preferences) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => dispatch(setActiveCategory("all"))}
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === "all"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          All Topics
        </button>

        {userCategories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => dispatch(setActiveCategory(cat))}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
