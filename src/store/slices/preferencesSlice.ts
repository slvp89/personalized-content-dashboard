import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPreferences, ContentCategory } from "@/types/content";
import { defaultPreferences, saveStoredPreferences } from "@/lib/storage";
import { LanguageCode } from "@/lib/i18n";

const initialState: UserPreferences = defaultPreferences;

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<ContentCategory>) => {
      const category = action.payload;
      if (state.categories.includes(category)) {
        if (state.categories.length > 1) {
          state.categories = state.categories.filter((c) => c !== category);
        }
      } else {
        state.categories.push(category);
      }
      saveStoredPreferences(state);
    },
    setCategories: (state, action: PayloadAction<ContentCategory[]>) => {
      if (action.payload.length > 0) {
        state.categories = action.payload;
        saveStoredPreferences(state);
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      saveStoredPreferences(state);
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      saveStoredPreferences(state);
    },
    setLayout: (state, action: PayloadAction<"grid" | "list" | "compact">) => {
      state.layout = action.payload;
      saveStoredPreferences(state);
    },
    setFeedMode: (state, action: PayloadAction<"infinite" | "paginated">) => {
      state.feedMode = action.payload;
      saveStoredPreferences(state);
    },
    setAutoRefreshInterval: (state, action: PayloadAction<number>) => {
      state.autoRefreshInterval = action.payload;
      saveStoredPreferences(state);
    },
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.language = action.payload;
      saveStoredPreferences(state);
    },
    hydratePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  toggleCategory,
  setCategories,
  toggleDarkMode,
  setDarkMode,
  setLayout,
  setFeedMode,
  setAutoRefreshInterval,
  setLanguage,
  hydratePreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
