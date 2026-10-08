import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveStoredFavorites } from "@/lib/storage";

interface FavoritesState {
  favoriteIds: string[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter((item) => item !== id);
      } else {
        state.favoriteIds.push(id);
      }
      saveStoredFavorites(state.favoriteIds);
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
        saveStoredFavorites(state.favoriteIds);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteIds = state.favoriteIds.filter((item) => item !== action.payload);
      saveStoredFavorites(state.favoriteIds);
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
      saveStoredFavorites([]);
    },
    hydrateFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteIds = action.payload;
    },
  },
});

export const {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  clearFavorites,
  hydrateFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
