"use client";

import React from "react";
import { SearchInput } from "@/components/common/SearchInput";
import {
  Moon,
  Sun,
  Globe,
  Radio,
  Sliders,
  Menu,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleDarkMode, setLanguage } from "@/store/slices/preferencesSlice";
import { toggleLiveSimulation } from "@/store/slices/contentSlice";
import { LanguageCode } from "@/lib/i18n";

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenAuth: () => void;
  onToggleMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onOpenAuth,
  onToggleMobileNav,
}) => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const lang = useAppSelector((state) => state.preferences.language);
  const isLive = useAppSelector((state) => state.content.isLiveSimulationActive);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-3">
      {/* Mobile menu button */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={onToggleMobileNav}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 font-black text-sm tracking-tight text-indigo-600 dark:text-indigo-400">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span>PulseDesk</span>
        </div>
      </div>

      {/* Universal Search Bar */}
      <div className="flex-1 max-w-xl hidden sm:block">
        <SearchInput />
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time ticker status button */}
        <button
          type="button"
          onClick={() => dispatch(toggleLiveSimulation())}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isLive
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "border-slate-200 dark:border-slate-800 text-slate-400"
          }`}
          title={isLive ? "Live updates active. Click to pause." : "Live updates paused. Click to resume."}
        >
          <Radio className={`w-3.5 h-3.5 ${isLive ? "animate-pulse" : ""}`} />
          <span className="hidden md:inline">{isLive ? "Live" : "Paused"}</span>
        </button>

        {/* Language dropdown */}
        <div className="relative">
          <select
            value={lang}
            onChange={(e) => dispatch(setLanguage(e.target.value as LanguageCode))}
            className="appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold py-1.5 pl-2.5 pr-6 rounded-xl cursor-pointer focus:outline-none"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="ja">JA</option>
          </select>
          <Globe className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Dark/Light mode toggle */}
        <button
          type="button"
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        {/* Settings button */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
          title="Preferences & Settings"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* User avatar / profile button */}
        <button
          type="button"
          onClick={onOpenAuth}
          className="flex items-center gap-2 p-1 pl-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
          title="User profile"
        >
          <span className="hidden xl:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
            {user.name.split(" ")[0]}
          </span>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};
