"use client";

import React from "react";
import {
  X,
  ExternalLink,
  Heart,
  Bookmark,
  Share2,
  Clock,
  Star,
  Film,
  CheckCircle2,
} from "lucide-react";
import { ContentItem } from "@/types/content";
import { Badge } from "@/components/common/Badge";
import { formatTimeAgo, formatNumberCompact } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { toggleLike } from "@/store/slices/analyticsSlice";
import { incrementLike } from "@/store/slices/contentSlice";
import { translations } from "@/lib/i18n";

interface ContentModalProps {
  item: ContentItem | null;
  onClose: () => void;
}

export const ContentModal: React.FC<ContentModalProps> = ({ item, onClose }) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const likedIds = useAppSelector((state) => state.analytics.likedIds);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  if (!item) return null;

  const isFavorite = favoriteIds.includes(item.id);
  const isLiked = likedIds.includes(item.id);

  const handleToggleLike = () => {
    if (!isLiked) {
      dispatch(incrementLike(item.id));
    }
    dispatch(toggleLike(item.id));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(item.id));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(item.url || window.location.href);
    alert("Article link copied to clipboard!");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl text-slate-900 dark:text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        {item.imageUrl && (
          <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <Badge type={item.type}>{item.type}</Badge>
              <Badge category={item.category}>{item.category}</Badge>
            </div>
          </div>
        )}

        {/* If no image, show simple top bar with close button */}
        {!item.imageUrl && (
          <div className="p-6 pb-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge type={item.type}>{item.type}</Badge>
              <Badge category={item.category}>{item.category}</Badge>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Social Author header */}
          {item.type === "social" && (
            <div className="flex items-center gap-3">
              <img
                src={item.authorAvatar}
                alt={item.authorName}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <div>
                <h4 className="font-bold text-base flex items-center gap-1.5">
                  {item.authorName}
                  {item.verified && (
                    <CheckCircle2 className="w-4 h-4 text-sky-500 fill-sky-500/20" />
                  )}
                </h4>
                <p className="text-xs text-slate-400">{item.authorHandle}</p>
              </div>
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-black leading-tight tracking-tight">
            {item.title}
          </h2>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 py-3 border-y border-slate-100 dark:border-slate-800">
            <span>Source: <strong className="text-slate-700 dark:text-slate-200">{item.source}</strong></span>
            <span>•</span>
            <span>Published: {formatTimeAgo(item.publishedAt)}</span>

            {item.type === "news" && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  {item.readingTimeMinutes} min read
                </span>
                <span>•</span>
                <span>Author: {item.author}</span>
              </>
            )}

            {item.type === "recommendation" && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {item.rating} / 10
                </span>
                <span>•</span>
                <span>By: {item.creator}</span>
                <span>•</span>
                <span>Length: {item.durationOrLength}</span>
              </>
            )}
          </div>

          {/* Description & Full content */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            <p className="font-medium text-slate-900 dark:text-slate-100">
              {item.summary}
            </p>

            {item.type === "news" && item.fullContent && (
              <p className="pt-2 text-slate-600 dark:text-slate-400">
                {item.fullContent}
              </p>
            )}

            {item.type === "recommendation" && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
                  <Film className="w-4 h-4" />
                  <span>Media Spec & Highlights</span>
                </div>
                <p className="text-xs text-indigo-950 dark:text-indigo-200">
                  Genre: <strong>{item.genre}</strong> • Format: <strong>{item.mediaType.toUpperCase()}</strong>
                </p>
              </div>
            )}

            {item.type === "social" && (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleLike}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isLiked
                  ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              <span>{formatNumberCompact(item.likes)}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isFavorite
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isFavorite ? "fill-indigo-600 text-indigo-600" : ""
                }`}
              />
              <span>{isFavorite ? t.saved : t.saveFavorite}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
          >
            <span>Visit Full Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
