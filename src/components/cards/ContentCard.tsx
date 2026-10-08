"use client";

import React, { useState } from "react";
import {
  Heart,
  Bookmark,
  Share2,
  ExternalLink,
  GripVertical,
  Clock,
  Play,
  MessageCircle,
  Repeat,
  CheckCircle2,
  Star,
  Check,
} from "lucide-react";
import { ContentItem } from "@/types/content";
import { Badge } from "@/components/common/Badge";
import { formatNumberCompact } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { toggleLike, recordItemRead } from "@/store/slices/analyticsSlice";
import { incrementLike } from "@/store/slices/contentSlice";
import { translations } from "@/lib/i18n";

interface ContentCardProps {
  item: ContentItem;
  onOpenModal: (item: ContentItem) => void;
  isDragEnabled?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onOpenModal,
  isDragEnabled = false,
}) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const likedIds = useAppSelector((state) => state.analytics.likedIds);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  const isFavorite = favoriteIds.includes(item.id);
  const isLiked = likedIds.includes(item.id);

  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(item.id));
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      dispatch(incrementLike(item.id));
    }
    dispatch(toggleLike(item.id));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `#item-${item.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardClick = () => {
    dispatch(recordItemRead(item));
    onOpenModal(item);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-400/30 cursor-pointer h-full"
    >
      {/* Top Banner & Image */}
      <div>
        {item.imageUrl && !imageError && (
          <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={item.imageUrl}
              alt={item.title}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            {/* Content Type pill overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <Badge type={item.type}>{item.type}</Badge>
              <Badge category={item.category}>{item.category}</Badge>
            </div>

            {/* Drag Handle if enabled */}
            {isDragEnabled && (
              <div
                className="absolute top-3 right-3 p-1.5 bg-black/50 text-white rounded-lg backdrop-blur-sm cursor-grab active:cursor-grabbing hover:bg-black/70 transition-colors"
                title="Drag to reorder"
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="w-4 h-4" />
              </div>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5">
          {!item.imageUrl || imageError ? (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Badge type={item.type}>{item.type}</Badge>
                <Badge category={item.category}>{item.category}</Badge>
              </div>
              {isDragEnabled && (
                <div
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-grab active:cursor-grabbing"
                  title="Drag to reorder"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GripVertical className="w-4 h-4" />
                </div>
              )}
            </div>
          ) : null}

          {/* Social Specific Author Info */}
          {item.type === "social" && (
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src={item.authorAvatar}
                alt={item.authorName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="flex flex-col text-xs leading-tight">
                <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  {item.authorName}
                  {item.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500/20" />
                  )}
                </span>
                <span className="text-slate-400">{item.authorHandle}</span>
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="font-bold text-base leading-snug text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
            {item.title}
          </h3>

          {/* Summary */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
            {item.summary}
          </p>

          {/* Contextual Info (Rating / Duration / Reading time / Hashtags) */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80">
            {item.type === "news" && (
              <>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  {item.readingTimeMinutes} min read
                </span>
                <span>•</span>
                <span className="truncate max-w-[130px] font-medium">{item.author}</span>
              </>
            )}

            {item.type === "recommendation" && (
              <>
                <span className="flex items-center gap-1 font-semibold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {item.rating}/10
                </span>
                <span>•</span>
                <span className="truncate max-w-[120px]">{item.creator}</span>
                <span>•</span>
                <span>{item.durationOrLength}</span>
              </>
            )}

            {item.type === "social" && (
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <Repeat className="w-3.5 h-3.5 text-emerald-500" />
                  {formatNumberCompact(item.retweets)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-sky-500" />
                  {formatNumberCompact(item.replies)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Like Button */}
          <button
            type="button"
            onClick={handleToggleLike}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isLiked
                ? "text-rose-600 bg-rose-50 dark:bg-rose-950/40"
                : "text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title={isLiked ? t.liked : t.like}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform ${
                isLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
              }`}
            />
            <span>{formatNumberCompact(item.likes)}</span>
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`p-1.5 rounded-lg transition-all ${
              isFavorite
                ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
                : "text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title={isFavorite ? t.saved : t.saveFavorite}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                isFavorite ? "fill-indigo-600 text-indigo-600" : ""
              }`}
            />
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Copy link to clipboard"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Primary Call-To-Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow transition-all"
        >
          {item.type === "news" && (
            <>
              <span>{t.readMore}</span>
              <ExternalLink className="w-3 h-3" />
            </>
          )}
          {item.type === "recommendation" && (
            <>
              <span>{t.playPreview}</span>
              <Play className="w-3 h-3 fill-white" />
            </>
          )}
          {item.type === "social" && (
            <>
              <span>{t.viewThread}</span>
              <MessageCircle className="w-3 h-3" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
