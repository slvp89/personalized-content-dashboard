"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "./index";
import {
  loadStoredPreferences,
  loadStoredFavorites,
  loadStoredLikes,
  loadStoredOrder,
} from "@/lib/storage";
import { hydratePreferences } from "./slices/preferencesSlice";
import { hydrateFavorites } from "./slices/favoritesSlice";
import { hydrateLikes } from "./slices/analyticsSlice";
import { hydrateCustomOrder } from "./slices/contentSlice";

function HydrationWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  useEffect(() => {
    // 1. Hydrate preferences
    const storedPrefs = loadStoredPreferences();
    dispatch(hydratePreferences(storedPrefs));

    // 2. Hydrate favorites
    const storedFavs = loadStoredFavorites();
    dispatch(hydrateFavorites(storedFavs));

    // 3. Hydrate likes
    const storedLikes = loadStoredLikes();
    dispatch(hydrateLikes(storedLikes));

    // 4. Hydrate custom order
    const storedOrder = loadStoredOrder();
    if (storedOrder.length > 0) {
      dispatch(hydrateCustomOrder(storedOrder));
    }
  }, [dispatch]);

  // Sync dark mode class on documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <HydrationWrapper>{children}</HydrationWrapper>
    </Provider>
  );
}
