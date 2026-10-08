"use client";

import React from "react";
import {
  X,
  Compass,
  Flame,
  Bookmark,
  BarChart3,
  Sliders,
  Sparkles,
} from "lucide-react";
import { NavTab } from "./Sidebar";
import { useAppSelector } from "@/store";
import { translations } from "@/lib/i18n";
import { SearchInput } from "@/components/common/SearchInput";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeTab,
  onChangeTab,
  onOpenSettings,
  onOpenAuth,
}) => {
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const user = useAppSelector((state) => state.auth.user);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  if (!isOpen) return null;

  const handleSelectTab = (tab: NavTab) => {
    onChangeTab(tab);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-72 max-w-[85vw] h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm">{t.dashboardTitle}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar on mobile */}
          <div className="mb-4">
            <SearchInput />
          </div>

          {/* Nav links */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleSelectTab("feed")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "feed"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{t.navFeed}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTab("trending")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "trending"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>{t.navTrending}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTab("favorites")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "favorites"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4" />
                <span>{t.navFavorites}</span>
              </div>
              {favoriteIds.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                  {favoriteIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSelectTab("analytics")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "analytics"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t.navAnalytics}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenSettings();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Sliders className="w-4 h-4" />
              <span>{t.navSettings}</span>
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              onOpenAuth();
              onClose();
            }}
            className="w-full flex items-center gap-3 text-left"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {user.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate">{user.role}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
