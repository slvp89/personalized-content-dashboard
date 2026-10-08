"use client";

import React from "react";
import {
  X,
  Sliders,
  Check,
  Moon,
  Sun,
  Clock,
  Globe,
  RotateCcw,
} from "lucide-react";
import { ContentCategory } from "@/types/content";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  toggleCategory,
  setDarkMode,
  setLayout,
  setFeedMode,
  setAutoRefreshInterval,
  setLanguage,
  setCategories,
} from "@/store/slices/preferencesSlice";
import { LanguageCode, translations } from "@/lib/i18n";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const allCategories: { id: ContentCategory; label: string; icon: string }[] = [
  { id: "technology", label: "Technology", icon: "💻" },
  { id: "business", label: "Business & Finance", icon: "📈" },
  { id: "science", label: "Science & Cosmos", icon: "🔬" },
  { id: "entertainment", label: "Entertainment & Cinema", icon: "🎬" },
  { id: "gaming", label: "Gaming & Esports", icon: "🎮" },
  { id: "health", label: "Health & Longevity", icon: "🌿" },
  { id: "sports", label: "Sports & Analytics", icon: "⚽" },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.preferences);
  const lang = preferences.language;
  const t = translations[lang] || translations.en;

  if (!isOpen) return null;

  const handleResetDefaults = () => {
    dispatch(
      setCategories([
        "technology",
        "business",
        "science",
        "entertainment",
        "gaming",
        "health",
        "sports",
      ])
    );
    dispatch(setLayout("grid"));
    dispatch(setFeedMode("infinite"));
    dispatch(setAutoRefreshInterval(30));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 md:p-8 space-y-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">{t.settingsTitle}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.settingsDesc}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.categoriesTitle} (Multi-select)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allCategories.map((cat) => {
              const isSelected = preferences.categories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => dispatch(toggleCategory(cat.id))}
                  className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "border border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme & Display Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Dark Mode Switcher */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.themeTitle}
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
              <button
                type="button"
                onClick={() => dispatch(setDarkMode(false))}
                className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  !preferences.darkMode
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>{t.lightMode}</span>
              </button>
              <button
                type="button"
                onClick={() => dispatch(setDarkMode(true))}
                className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  preferences.darkMode
                    ? "bg-slate-900 text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>{t.darkMode}</span>
              </button>
            </div>
          </div>

          {/* Layout density */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.layoutDensity}
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
              <button
                type="button"
                onClick={() => dispatch(setLayout("grid"))}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  preferences.layout === "grid"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => dispatch(setLayout("list"))}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  preferences.layout === "list"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                List
              </button>
              <button
                type="button"
                onClick={() => dispatch(setLayout("compact"))}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  preferences.layout === "compact"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Compact
              </button>
            </div>
          </div>
        </div>

        {/* Live Stream Auto-Refresh & Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.autoRefresh}</span>
            </label>
            <select
              value={preferences.autoRefreshInterval}
              onChange={(e) =>
                dispatch(setAutoRefreshInterval(parseInt(e.target.value, 10)))
              }
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={15}>Every 15 seconds (High Frequency)</option>
              <option value={30}>Every 30 seconds (Recommended)</option>
              <option value={60}>Every 60 seconds</option>
              <option value={0}>Disabled</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span>Language (i18n)</span>
            </label>
            <select
              value={preferences.language}
              onChange={(e) =>
                dispatch(setLanguage(e.target.value as LanguageCode))
              }
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語 (Japanese)</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all"
          >
            {t.saveChanges}
          </button>
        </div>
      </div>
    </div>
  );
};
