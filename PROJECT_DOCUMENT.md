# Project Documentation: PulseDesk — Personalized Content Dashboard
**Role**: Software Development Engineer (SDE) Intern — Frontend Development Assignment  
**Candidate GitHub**: [https://github.com/slvp89/personalized-content-dashboard](https://github.com/slvp89/personalized-content-dashboard)  
**Tech Stack**: Next.js 14 (App Router), React 18, TypeScript, Redux Toolkit, Tailwind CSS, Framer Motion, Vitest, React Testing Library  

---

## 1. Executive Summary & Project Overview

**PulseDesk** is a personalized intelligence dashboard built to solve information overload. The application aggregates, filters, and prioritizes multi-format content streams:
1. **Curated News**: Categorized breaking journalism across Technology, Business, Science, Health, Gaming, and Sports.
2. **Media Recommendations**: Movies, ambient & neoclassical soundscapes, engineering podcasts, and computer science textbooks with runtime, ratings, and instant preview reader.
3. **Social Buzz**: Micro-posts mimicking platforms like Twitter/X with verified author profiles, engagement metrics (retweets, likes, replies), and trending hashtags.

The platform provides a customizable, reactive dashboard with **interactive drag-and-drop feed prioritization**, **sub-millisecond debounced search**, **theme transitions (Dark / Light)**, **reading habit analytics**, **real-time live stream updates**, and **full internationalization (5 languages)**.

---

## 2. Technical Architecture & System Design

### 2.1 Framework & Core Technologies
- **Next.js 14 (App Router)**: Hybrid server/client rendering architecture ensuring fast First Contentful Paint (FCP) and SEO-optimized metadata.
- **TypeScript (Strict Mode)**: 100% type safety across API response structures, Redux store slices, and UI component interfaces.
- **Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)**: Centralized global state management with decoupled slices, asynchronous thunks, and middleware for automatic `localStorage` synchronization.
- **Framer Motion**: Smooth 60fps layout animations, modal spring physics, and fluid drag-and-drop card reordering (`Reorder.Group` & `Reorder.Item`).
- **Tailwind CSS & CSS Variables**: Clean theme management adhering to WCAG contrast standards with glassmorphic backdrop filters and custom brand palettes.

### 2.2 Project Structure
```
personalized-content-dashboard/
├── src/
│   ├── app/
│   │   ├── api/                     # Backend API Routes (News, Recommendations, Social, Trending, Feed)
│   │   ├── globals.css              # Custom theme variables & glassmorphism tokens
│   │   ├── layout.tsx               # SEO Metadata, font definitions & ReduxProvider
│   │   └── page.tsx                 # Core Dashboard orchestrator
│   ├── components/
│   │   ├── cards/                   # ContentCard (universal multi-type), TrendingCard
│   │   ├── common/                  # Badge, SearchInput, SkeletonCard
│   │   ├── feed/                    # FeedContainer, FilterBar, LiveNotificationBanner
│   │   ├── layout/                  # Sidebar, Header, MobileNav
│   │   ├── modals/                  # ContentModal, SettingsModal, AuthModal
│   │   └── sections/                # PersonalizedFeed, TrendingSection, FavoritesSection, AnalyticsSection
│   ├── hooks/
│   │   ├── useDebounce.ts           # 350ms input debouncing hook
│   │   └── useRealtimeFeed.ts       # Background live ticker simulator
│   ├── lib/
│   │   ├── i18n.ts                  # Multi-language translations (EN, ES, FR, DE, JA)
│   │   ├── mockData.ts              # Diverse realistic content catalog
│   │   ├── storage.ts               # LocalStorage persistence & hydration helpers
│   │   └── utils.ts                 # Formatting utilities
│   ├── store/
│   │   ├── slices/                  # Redux slices: content, preferences, favorites, analytics, auth
│   │   ├── index.ts                 # Store configuration & typed hooks
│   │   └── ReduxProvider.tsx        # Client hydration wrapper
│   └── test/                        # Vitest & React Testing Library test suites (28 tests)
```

---

## 3. Core Feature Walkthrough

### 3.1 Personalized Unified Feed & Filter Bar
- **Topic Filtering**: Users can filter across 7 curated categories or select multiple categories from their preferences panel.
- **Format Filtering**: Switch instantly between *All Streams*, *News Only*, *Media Recommendations*, and *Social Buzz*.
- **Display Modes**: Toggle between **Infinite Scroll** (continuous reading) and **Paginated Navigation** (1, 2, 3... page buttons).
- **Layout Density**: Support for **Grid** (3 columns), **List** (single column reader), and **Compact** (dense cards).

### 3.2 Drag-and-Drop Feed Reordering
- Users can click **"Reorder Cards"** to activate Framer Motion layout drag grips.
- Dragging any card seamlessly shifts surrounding cards with spring physics.
- Reordered sequence is saved in Redux and persisted in `localStorage`.
- Includes a **"Reset Order"** button that restores pure chronological sorting.

### 3.3 High-Performance Debounced Search
- The global search bar employs a custom `useDebounce` hook with a **350ms threshold**.
- Prevents expensive re-filtering calculations on every keystroke.
- Searches title, body summary, source, author, and hashtags simultaneously.
- Features global keyboard shortcut `Ctrl + K` / `Cmd + K` and a one-click clear button.

### 3.4 Trending Radar
- Displays top 8 trending items ranked by engagement scores.
- Dynamic ranking badges (#1 Gold, #2 Silver, #3 Bronze).
- Velocity metric tags (`+72% this hour`, `+54% today`).

### 3.5 Saved Favorites Archive
- Any content card can be bookmarked with a single click.
- Dedicated view with in-archive search and format filter pills.
- **Export to JSON**: One-click feature to download all bookmarked items as a structured `.json` backup file.

### 3.6 Reading Insights & Analytics Hub
- Tracks total articles explored and cumulative minutes spent reading.
- Active daily learning streak counter.
- Visual topic distribution progress bars showing reading habits.
- Real-time recent reading history log.

---

## 4. State Management & Offline Persistence (Redux Toolkit)

| Slice Name | Responsibility | State Managed |
| :--- | :--- | :--- |
| `contentSlice` | Feed data & view state | Items catalog, status (`idle` / `loading` / `succeeded`), active format, active category, search query, custom drag order IDs, pending live items queue. |
| `preferencesSlice` | User configuration | Selected categories list, dark/light theme, layout density, auto-refresh rate, language code. |
| `favoritesSlice` | Bookmarks collection | Array of saved item IDs, toggle, add, remove, and clear actions. |
| `analyticsSlice` | Habit tracking | Articles read history log, liked IDs array, streak count, minutes spent. |
| `authSlice` | Profile management | Current user persona (name, role, avatar, bio), persona switching presets. |

All preferences, bookmarked favorites, liked items, and custom drag-and-drop orders are automatically synchronized to `localStorage` and re-hydrated on client mount.

---

## 5. Bonus Implementations

1. **Simulated Real-Time Stream**: A background event loop periodically delivers breaking news and viral tweets. A floating notification banner (*"⚡ N new updates available — Click to view"*) appears at the top.
2. **Internationalization (i18n)**: Instant reactive localization supporting **English (EN)**, **Español (ES)**, **Français (FR)**, **Deutsch (DE)**, and **日本語 (JA)**.
3. **Persona Switching & Account Editor**: Switch between pre-set personas (Alex - Systems Architect, Dr. Maya - Astrophysicist, Marcus - FinTech Strategist) or edit your custom profile name, role, and bio.

---

## 6. Testing Strategy & Quality Assurance

The codebase features 28 unit and integration tests written in **Vitest** and **React Testing Library**:
- **Redux Slice Unit Tests**:
  - `preferencesSlice.test.ts`: Category selection, minimum 1 category constraint, theme toggling, language change.
  - `contentSlice.test.ts`: Search queries, format filtering, custom drag-and-drop order reordering, chronological reset, like incrementation, live queue ingestion.
  - `favoritesSlice.test.ts`: Adding, toggling, and clearing bookmarks.
- **Component Integration Tests**:
  - `SearchInput.test.tsx`: Input rendering, 350ms debounce delay verification, and clear action.
  - `ContentCard.test.tsx`: Card metadata rendering, like counter update, bookmark toggle, and reader modal callback.
  - `FeedContainer.test.tsx`: Empty state handling and card list rendering.

All 6 test suites execute with a **100% pass rate**:
```bash
Test Files  6 passed (6)
Tests       28 passed (28)
```

---

## 7. Performance & Security Best Practices
- **Debounced Input**: Eliminates extraneous re-renders during high-speed typing.
- **Lazy Rendering & Modal Portals**: Full content and media previews are loaded on demand to prevent heavy initial DOM sizes.
- **Sanitized Routing & Local Storage Isolation**: All storage interactions are wrapped in safety try-catch blocks with versioned keys to prevent schema corruption.
- **WCAG Accessibility Compliance**: Explicit ARIA labels, semantic HTML5 elements (`<header>`, `<aside>`, `<main>`), and contrast ratios verified in both dark and light modes.
