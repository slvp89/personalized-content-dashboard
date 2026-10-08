import React from "react";
import { ContentCategory, ContentType } from "@/types/content";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  category?: ContentCategory | string;
  type?: ContentType;
  className?: string;
  size?: "sm" | "md";
}

const categoryStyles: Record<string, string> = {
  technology: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20",
  business: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  science: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
  entertainment: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
  gaming: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  health: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  sports: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20",
};

const typeStyles: Record<ContentType, string> = {
  news: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
  recommendation: "bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20",
  social: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  category,
  type,
  className,
  size = "sm",
}) => {
  let colorClass = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";

  if (category && categoryStyles[category.toLowerCase()]) {
    colorClass = categoryStyles[category.toLowerCase()];
  } else if (type && typeStyles[type]) {
    colorClass = typeStyles[type];
  }

  const sizeClass = size === "sm" ? "text-xs px-2.5 py-0.5" : "text-xs px-3 py-1 font-medium";

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border transition-colors capitalize",
        sizeClass,
        colorClass,
        className
      )}
    >
      {children}
    </span>
  );
};
