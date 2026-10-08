"use client";

import React from "react";
import {
  Sparkles,
  Flame,
  Bookmark,
  BarChart3,
  Sliders,
  Compass,
  Cpu,
  Tv,
  Briefcase,
  Trophy,
  Dna,
  Gamepad2,
  HeartPulse,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setActiveCategory } from "@/store/slices/contentSlice";
import { translations } from "@/lib/i18n";
import { ContentCategory } from "@/types/content";

export type NavTab = "feed" | "trending" | "favorites" | "analytics" | "settings";

interface SidebarProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
}

const categoryIcons: Record<ContentCategory, React.ReactNode> = {
  technology: <Cpu className="w-3.5 h-3.5 text-cyan-500" />,
  business: <Briefcase className="w-3.5 h-3.5 text-blue-500" />,
  science: <Dna className="w-3.5 h-3.5 text-purple-500" />,
  entertainment: <Tv className="w-3.5 h-3.5 text-rose-500" />,
  gaming: <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />,
  health: <HeartPulse className="w-3.5 h-3.5 text-emerald-500" />,
  sports: <Trophy className="w-3.5 h-3.5 text-orange-500" />,
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onChangeTab,
  onOpenSettings,
  onOpenAuth,
}) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const user = useAppSelector((state) => state.auth.user);
  const userCategories = useAppSelector((state) => state.preferences.categories);
  const activeCategory = useAppSelector((state) => state.content.activeCategory);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  const navItems: { tab: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { tab: "feed", label: t.navFeed, icon: <Compass className="w-4 h-4" /> },
    { tab: "trending", label: t.navTrending, icon: <Flame className="w-4 h-4" /> },
    {
      tab: "favorites",
      label: t.navFavorites,
      icon: <Bookmark className="w-4 h-4" />,
      badge: favoriteIds.length,
    },
    { tab: "analytics", label: t.navAnalytics, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between p-4 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h1 className="font-black text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>{t.dashboardTitle}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                PRO
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 truncate max-w-[130px]">
              {t.dashboardSubtitle}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1 mb-8">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                type="button"
                onClick={() => onChangeTab(item.tab)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive
                        ? "bg-white text-indigo-700"
                        : "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Preferred Categories Quick-Filter */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Quick Topics
            </span>
            <button
              type="button"
              onClick={onOpenSettings}
              className="text-[10px] text-indigo-500 hover:underline font-semibold"
            >
              Edit
            </button>
          </div>

          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => {
                dispatch(setActiveCategory("all"));
                if (activeTab !== "feed") onChangeTab("feed");
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === "all"
                  ? "bg-slate-200/70 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>All Active Topics</span>
            </button>

            {userCategories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    dispatch(setActiveCategory(cat));
                    if (activeTab !== "feed") onChangeTab("feed");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                    isSelected
                      ? "bg-slate-200/70 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {categoryIcons[cat] || (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  )}
                  <span className="truncate">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User profile card at bottom */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
        <button
          type="button"
          onClick={onOpenAuth}
          className="w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">{user.role}</p>
          </div>
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </aside>
  );
};
