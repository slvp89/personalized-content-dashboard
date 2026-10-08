"use client";

import React from "react";
import { Zap, ArrowUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { applyPendingLiveItems } from "@/store/slices/contentSlice";
import { translations } from "@/lib/i18n";

export const LiveNotificationBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const pendingItems = useAppSelector((state) => state.content.pendingLiveItems);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  if (pendingItems.length === 0) return null;

  return (
    <div className="w-full mb-6 animate-bounce">
      <button
        type="button"
        onClick={() => {
          dispatch(applyPendingLiveItems());
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] transition-all"
      >
        <Zap className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse" />
        <span>
          {pendingItems.length} {t.newUpdatesAvailable} — {t.clickToView}
        </span>
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
