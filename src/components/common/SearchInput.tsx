"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearchQuery } from "@/store/slices/contentSlice";
import { translations } from "@/lib/i18n";

export const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentQuery = useAppSelector((state) => state.content.searchQuery);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = translations[lang] || translations.en;

  const [inputVal, setInputVal] = useState(currentQuery);
  const debouncedQuery = useDebounce(inputVal, 350);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync debounced query with Redux store
  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  // Keep local input in sync if external reset occurs
  useEffect(() => {
    setInputVal(currentQuery);
  }, [currentQuery]);

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    setInputVal("");
    dispatch(setSearchQuery(""));
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        ref={inputRef}
        type="text"
        id="dashboard-search-input"
        aria-label={t.searchAria}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="w-full pl-10 pr-20 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 shadow-sm"
      />
      <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1.5">
        {inputVal ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            ⌘K
          </kbd>
        )}
      </div>
    </div>
  );
};
