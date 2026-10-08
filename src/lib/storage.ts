import { UserPreferences } from "@/types/content";

const PREFERENCES_STORAGE_KEY = "pulse_desk_preferences_v1";
const FAVORITES_STORAGE_KEY = "pulse_desk_favorites_v1";
const LIKES_STORAGE_KEY = "pulse_desk_likes_v1";
const CUSTOM_ORDER_STORAGE_KEY = "pulse_desk_custom_order_v1";

export const defaultPreferences: UserPreferences = {
  categories: ["technology", "business", "science", "entertainment", "gaming", "health", "sports"],
  darkMode: true,
  layout: "grid",
  feedMode: "infinite",
  autoRefreshInterval: 30, // seconds
  language: "en",
};

export const loadStoredPreferences = (): UserPreferences => {
  if (typeof window === "undefined") return defaultPreferences;
  try {
    const raw = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return defaultPreferences;
    const parsed = JSON.parse(raw);
    return { ...defaultPreferences, ...parsed };
  } catch {
    return defaultPreferences;
  }
};

export const saveStoredPreferences = (prefs: UserPreferences): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error("Failed to persist preferences to localStorage", err);
  }
};

export const loadStoredFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredFavorites = (ids: string[]): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error("Failed to persist favorites to localStorage", err);
  }
};

export const loadStoredLikes = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredLikes = (ids: string[]): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error("Failed to persist likes to localStorage", err);
  }
};

export const loadStoredOrder = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_ORDER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredOrder = (ids: string[]): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CUSTOM_ORDER_STORAGE_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error("Failed to persist custom order to localStorage", err);
  }
};
