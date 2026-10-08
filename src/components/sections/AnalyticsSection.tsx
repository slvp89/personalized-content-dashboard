"use client";

import React from "react";
import { useAppSelector } from "@/store";
import {
  BarChart3,
  Clock,
  Flame,
  BookOpen,
  PieChart,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";

export const AnalyticsSection: React.FC = () => {
  const analytics = useAppSelector((state) => state.analytics);
  const user = useAppSelector((state) => state.auth.user);
  const items = useAppSelector((state) => state.content.items);

  // Calculate category distribution based on readHistory and items
  const categoryCounts: Record<string, number> = {};
  items.forEach((item) => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  });

  const totalCatalogItems = items.length || 1;

  const statCards = [
    {
      title: "Content Items Explored",
      value: analytics.totalArticlesRead,
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
      change: "+4 today",
      color: "border-indigo-500/20 bg-indigo-500/5",
    },
    {
      title: "Reading & Media Time",
      value: `${analytics.totalTimeSpentMinutes} mins`,
      icon: <Clock className="w-5 h-5 text-cyan-500" />,
      change: "+18 mins today",
      color: "border-cyan-500/20 bg-cyan-500/5",
    },
    {
      title: "Active Learning Streak",
      value: `${analytics.readingStreakDays} Days`,
      icon: <Flame className="w-5 h-5 text-rose-500 fill-rose-500/20" />,
      change: "Personal best: 14 days",
      color: "border-rose-500/20 bg-rose-500/5",
    },
    {
      title: "Articles & Posts Liked",
      value: analytics.likedIds.length,
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
      change: "High engagement",
      color: "border-emerald-500/20 bg-emerald-500/5",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Banner */}
      <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <span>Reading Insights & Habit Hub</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time analytics for {user.name}’s personalized consumption patterns
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 self-start md:self-auto">
          <CheckCircle2 className="w-4 h-4" />
          <span>Active Daily Learner</span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl border ${stat.color} bg-white/70 dark:bg-slate-900/70 backdrop-blur transition-all hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.title}
              </span>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">
              {stat.value}
            </div>
            <div className="text-[11px] font-medium text-slate-400">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Category breakdown progress bars + Recent history */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category distribution */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
            <PieChart className="w-4 h-4 text-indigo-500" />
            <span>Feed Topic Distribution</span>
          </div>
          <div className="space-y-3 pt-2">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalCatalogItems) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="capitalize text-slate-700 dark:text-slate-300">
                      {cat}
                    </span>
                    <span className="text-slate-400">{pct}% ({count} items)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recently Read History */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
            <Clock className="w-4 h-4 text-cyan-500" />
            <span>Recent Reading Activity</span>
          </div>

          <div className="space-y-3 pt-1">
            {analytics.readHistory.length > 0 ? (
              analytics.readHistory.slice(0, 5).map((rec) => (
                <div
                  key={rec.id + rec.timestamp}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {rec.title}
                    </p>
                    <span className="text-[10px] text-indigo-500 capitalize font-medium">
                      {rec.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    {formatTimeAgo(rec.timestamp)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                Click &quot;Read Article&quot; or &quot;Play Preview&quot; on any card to begin recording your reading journey!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
