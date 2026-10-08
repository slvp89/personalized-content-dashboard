import { describe, it, expect } from "vitest";
import preferencesReducer, {
  toggleCategory,
  toggleDarkMode,
  setLayout,
  setLanguage,
  setCategories,
} from "@/store/slices/preferencesSlice";
import { defaultPreferences } from "@/lib/storage";

describe("preferencesSlice", () => {
  it("should initialize with default preferences", () => {
    const state = preferencesReducer(undefined, { type: "@@INIT" });
    expect(state.categories).toContain("technology");
    expect(state.darkMode).toBe(true);
    expect(state.layout).toBe("grid");
  });

  it("should toggle a category off if more than 1 category exists", () => {
    const initialState = {
      ...defaultPreferences,
      categories: ["technology", "business", "science"] as any,
    };
    const nextState = preferencesReducer(initialState, toggleCategory("technology"));
    expect(nextState.categories).not.toContain("technology");
    expect(nextState.categories).toContain("business");
  });

  it("should not remove the last remaining category to prevent empty state lock", () => {
    const initialState = {
      ...defaultPreferences,
      categories: ["technology"] as any,
    };
    const nextState = preferencesReducer(initialState, toggleCategory("technology"));
    expect(nextState.categories).toContain("technology");
  });

  it("should add a category if not currently selected", () => {
    const initialState = {
      ...defaultPreferences,
      categories: ["technology"] as any,
    };
    const nextState = preferencesReducer(initialState, toggleCategory("gaming"));
    expect(nextState.categories).toContain("gaming");
    expect(nextState.categories).toContain("technology");
  });

  it("should toggle dark mode", () => {
    const state1 = preferencesReducer({ ...defaultPreferences, darkMode: true }, toggleDarkMode());
    expect(state1.darkMode).toBe(false);

    const state2 = preferencesReducer(state1, toggleDarkMode());
    expect(state2.darkMode).toBe(true);
  });

  it("should set layout density", () => {
    const state = preferencesReducer(defaultPreferences, setLayout("list"));
    expect(state.layout).toBe("list");
  });

  it("should change language", () => {
    const state = preferencesReducer(defaultPreferences, setLanguage("es"));
    expect(state.language).toBe("es");
  });
});
