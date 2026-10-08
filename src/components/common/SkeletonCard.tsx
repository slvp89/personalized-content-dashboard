import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm animate-pulse flex flex-col justify-between h-[380px]">
      <div>
        <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4 w-full" />
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-11/12 mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 mb-4" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
