import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import preferencesReducer from "./slices/preferencesSlice";
import contentReducer from "./slices/contentSlice";
import favoritesReducer from "./slices/favoritesSlice";
import analyticsReducer from "./slices/analyticsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    content: contentReducer,
    favorites: favoritesReducer,
    analytics: analyticsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
