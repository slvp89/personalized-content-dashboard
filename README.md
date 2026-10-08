# ⚡ PulseDesk — Personalized Content Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.13-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0-FCC72B?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> **Software Development Engineer (SDE) Intern — Frontend Development Assignment Submission**  
> An interactive, user-centric **Personalized Content Dashboard** built with Next.js 14 (App Router), TypeScript, Redux Toolkit, Framer Motion, and Tailwind CSS. Aggregates and organizes multi-source streams (News, Media Recommendations, Social Posts) with drag-and-drop feed prioritization, debounced search, dark/light theming, reading analytics, real-time live updates, and i18n support.

---

## 🌟 Key Features & Requirements Coverage

### 1. Personalized Content Feed
- **Multi-Source Aggregation**: Integrates three distinct content streams:
  - 📰 **News API**: Latest articles categorized across Technology, Business, Science, Health, Gaming, and Sports.
  - 🎬 **Recommendations API**: Media recommendations (Movies, Neoclassical/Ambient Music, Tech Podcasts, Engineering Books) with rating scores, runtimes, and direct previews.
  - 💬 **Social Media API**: Micro-posts with author handles, verified badges, engagement counters (likes, retweets, replies), and trending hashtags.
- **Interactive Content Cards**: Rich cards featuring dynamic category badges, reading times, duration/ratings, like counter, bookmark toggle, clipboard share, and modal preview reader.
- **Infinite Scrolling & Paginated Display**: Seamlessly toggle between infinite load-more flow and discrete page navigation.

### 2. User Dashboard Architecture
- **Responsive Layout**: Collapsible sidebar navigation, mobile drawer navigation, and top utility header.
- **5 Dedicated Views**:
  1. 🧭 **Unified Feed**: Unified stream filtered by preferred topics and content formats.
  2. 🔥 **Trending Radar**: Ranked viral content (#1 to #8) with growth velocity indicators (`+72% this hour`).
  3. ⭐ **Saved Favorites**: Curated archive of bookmarked items with in-archive search, type filters, and one-click JSON export.
  4. 📊 **Reading Insights**: Reading streak counter, minutes consumed, topic distribution progress charts, and reading history log.
  5. ⚙️ **Preferences Panel**: Multi-select categories, layout density (Grid / List / Compact), refresh interval, and reset triggers.

### 3. High-Performance Debounced Search
- **Debounced Input (350ms)**: Custom `useDebounce` hook avoids redundant render cycles during typing.
- **Universal Scope**: Searches headlines, summaries, sources, authors, and hashtags.
- **Power Shortcut**: Supports `Ctrl + K` / `Cmd + K` for instant search focus and one-click clear.

### 4. Advanced UI/UX & Interactivity
- **Drag-and-Drop Reordering**: Interactive card reordering built with Framer Motion (`Reorder.Group` & `Reorder.Item`). Reordered layout persists directly to Redux and `localStorage`.
- **Theme Switcher**: Dark mode / Light mode toggle using CSS custom properties, backdrop blur glassmorphism, and Tailwind CSS tokens.
- **Micro-Animations**: Smooth card hover elevation, spring modal scale transitions, skeleton loaders, and live pulse indicators.

### 5. State Management & Offline Resilience (Redux Toolkit)
- **Centralized Redux Store**:
  - `contentSlice`: Stream items, filter states, async fetching thunks, drag reorder state, live queue.
  - `preferencesSlice`: Selected topics, theme mode, layout density, refresh rate, locale.
  - `favoritesSlice`: Bookmarked IDs with synchronization.
  - `analyticsSlice`: Reading history, liked items, reading streaks.
  - `authSlice`: User profile management with persona switching.
- **LocalStorage Sync**: Automatic hydration and state persistence across page reloads.

### 6. Bonus Features Implemented
- ⚡ **Real-Time Live Feed**: Background ticker (`useRealtimeFeed`) simulating live incoming breaking news and posts, complete with floating *"⚡ New updates available"* banner.
- 🌐 **Multi-Language Support (i18n)**: Switch between **English (EN)**, **Español (ES)**, **Français (FR)**, **Deutsch (DE)**, and **日本語 (JA)** with reactive UI translation.
- 👤 **Persona & Profile Customization**: Edit display name, title, bio, or switch between pre-configured user personas (Alex - Systems Architect, Dr. Maya - Astrophysicist, Marcus - FinTech).
- 💾 **Data Export**: Export saved favorites to clean `.json` file for portability.

---

## 🏗️ Architecture & Project Structure

```
personalized-content-dashboard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── feed/route.ts            # Unified aggregated feed endpoint
│   │   │   ├── news/route.ts            # News API route
│   │   │   ├── recommendations/route.ts # Media recommendations endpoint
│   │   │   ├── social/route.ts          # Social media posts endpoint
│   │   │   └── trending/route.ts        # Ranked trending items endpoint
│   │   ├── globals.css                  # Custom theme tokens & glassmorphism
│   │   ├── layout.tsx                   # SEO Metadata, font, Redux Provider
│   │   └── page.tsx                     # Main dashboard page
│   ├── components/
│   │   ├── cards/
│   │   │   ├── ContentCard.tsx          # Universal interactive card (News, Media, Social)
│   │   │   └── TrendingCard.tsx         # Trending card with ranking badges & velocity
│   │   ├── common/
│   │   │   ├── Badge.tsx                # Category and format tag badges
│   │   │   ├── SearchInput.tsx          # Debounced search input with Ctrl+K shortcut
│   │   │   └── SkeletonCard.tsx         # Shimmering loading skeleton
│   │   ├── feed/
│   │   │   ├── FeedContainer.tsx        # Framer Motion drag & drop + Grid/List views
│   │   │   ├── FilterBar.tsx            # Format tabs, topic pills, layout density
│   │   │   └── LiveNotificationBanner.tsx # Real-time incoming updates floating pill
│   │   ├── layout/
│   │   │   ├── Header.tsx               # Top navigation, theme, language, profile
│   │   │   ├── Sidebar.tsx              # Sticky desktop sidebar navigation
│   │   │   └── MobileNav.tsx            # Collapsible mobile drawer
│   │   ├── modals/
│   │   │   ├── AuthModal.tsx            # Profile editor & persona switcher
│   │   │   ├── ContentModal.tsx         # Full article reader & media preview
│   │   │   └── SettingsModal.tsx        # Preference panel (categories, layout, auto-refresh)
│   │   └── sections/
│   │       ├── AnalyticsSection.tsx     # Reading streak, time spent, topic distribution
│   │       ├── FavoritesSection.tsx     # Bookmarked archive with JSON export
│   │       ├── PersonalizedFeed.tsx     # Main feed stream
│   │       └── TrendingSection.tsx      # Viral trending radar
│   ├── hooks/
│   │   ├── useDebounce.ts               # Input debouncer hook
│   │   └── useRealtimeFeed.ts           # Real-time background feed broadcaster
│   ├── lib/
│   │   ├── i18n.ts                      # Multi-language translation dictionary
│   │   ├── mockData.ts                  # High-quality realistic dataset & live queue
│   │   ├── storage.ts                   # LocalStorage persistence helpers
│   │   └── utils.ts                     # Utility helpers (cn, timeAgo, number compact)
│   ├── store/
│   │   ├── index.ts                     # Root Redux store configuration
│   │   ├── ReduxProvider.tsx            # Client Provider with hydration listeners
│   │   └── slices/                      # Redux slices (content, preferences, favorites, analytics, auth)
│   ├── test/                            # Comprehensive Vitest test suite
│   │   ├── contentSlice.test.ts
│   │   ├── favoritesSlice.test.ts
│   │   ├── preferencesSlice.test.ts
│   │   ├── ContentCard.test.tsx
│   │   ├── FeedContainer.test.tsx
│   │   └── SearchInput.test.tsx
│   └── types/
│       └── content.ts                   # Strict TypeScript definitions
├── tailwind.config.ts                   # Tailwind configuration with dark mode class & custom colors
├── vitest.config.mts                    # Vitest configuration with JSDOM
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17+ or v20+ recommended
- **npm** or **yarn** or **pnpm**

### Installation

1. Clone or navigate to the project repository:
   ```bash
   cd personalized-content-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🧪 Running Tests

The application includes unit tests and component integration tests covering state slices, edge cases, debounced input, and user actions:

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage Highlights:
- ✅ **Redux Slices**: Tested category preference toggle, dark mode, language switcher, custom drag order reordering, chronological reset, like incrementation, and live stream ingestion.
- ✅ **Debounced Search**: Tested input debouncing delay (350ms) to Redux store and clear action.
- ✅ **Card Interactions**: Tested bookmark toggle, like counter updates, and full modal trigger.
- ✅ **Container Layout**: Tested empty state rendering and card list rendering.

---

## 🎨 Design & Aesthetic Highlights

- **Tailored Modern Typography & Glassmorphism**: Utilizes frosted glass panels (`backdrop-blur-md`), subtle radial glow borders, and clean contrast ratios adhering to accessibility standards (WCAG).
- **Curated Theme Accents**:
  - Dark Theme: Deep midnight navy base (`#090d16`) with electric violet/indigo accents (`#6366f1`) and cyan highlights (`#06b6d4`).
  - Light Theme: Crisp slate-50 base (`#f8fafc`) with sharp contrast and subtle indigo borders.
- **Zero Placeholder Jargon**: Every card features real, diverse data: quantum physics breakthroughs, AI engineering architectures, Denis Villeneuve's Dune Part 2, ambient modular synthesizer albums, and high-engagement developer social posts.

---

## 📦 Production Build

To verify the production bundle:
```bash
npm run build
npm run start
```
Output compiles statically and server-rendered routes with zero TypeScript or ESLint errors.

---

## 📝 License
MIT License. Developed for the Frontend SDE Intern Assignment.
