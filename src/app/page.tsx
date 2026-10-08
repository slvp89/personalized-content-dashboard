"use client";

import React, { useState } from "react";
import { Sidebar, NavTab } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { PersonalizedFeed } from "@/components/sections/PersonalizedFeed";
import { TrendingSection } from "@/components/sections/TrendingSection";
import { FavoritesSection } from "@/components/sections/FavoritesSection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { ContentModal } from "@/components/modals/ContentModal";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { AuthModal } from "@/components/modals/AuthModal";
import { ContentItem } from "@/types/content";
import { useRealtimeFeed } from "@/hooks/useRealtimeFeed";

export default function DashboardPage() {
  // Activate background real-time feed simulation
  useRealtimeFeed();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<NavTab>("feed");

  // Modal dialog states
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full transition-all">
          {activeTab === "feed" && (
            <PersonalizedFeed
              onOpenModal={(item) => setSelectedItem(item)}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}

          {activeTab === "trending" && (
            <TrendingSection onOpenModal={(item) => setSelectedItem(item)} />
          )}

          {activeTab === "favorites" && (
            <FavoritesSection onOpenModal={(item) => setSelectedItem(item)} />
          )}

          {activeTab === "analytics" && <AnalyticsSection />}
        </main>
      </div>

      {/* Detailed Content Reader / Media Preview Modal */}
      <ContentModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* User Preferences & Customization Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Profile & Persona Switcher Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
