import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentItem } from "@/types/content";
import { saveStoredLikes } from "@/lib/storage";

export interface ReadRecord {
  id: string;
  title: string;
  category: string;
  type: string;
  timestamp: string;
}

interface AnalyticsState {
  readHistory: ReadRecord[];
  likedIds: string[];
  totalArticlesRead: number;
  totalTimeSpentMinutes: number;
  readingStreakDays: number;
}

const initialState: AnalyticsState = {
  readHistory: [],
  likedIds: [],
  totalArticlesRead: 14,
  totalTimeSpentMinutes: 68,
  readingStreakDays: 5,
};

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    recordItemRead: (state, action: PayloadAction<ContentItem>) => {
      const item = action.payload;
      const alreadyRead = state.readHistory.some((r) => r.id === item.id);
      if (!alreadyRead) {
        state.readHistory.unshift({
          id: item.id,
          title: item.title,
          category: item.category,
          type: item.type,
          timestamp: new Date().toISOString(),
        });
        state.totalArticlesRead += 1;
        state.totalTimeSpentMinutes += (item.type === "news" ? item.readingTimeMinutes : 3);
      }
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.likedIds.includes(id)) {
        state.likedIds = state.likedIds.filter((item) => item !== id);
      } else {
        state.likedIds.push(id);
      }
      saveStoredLikes(state.likedIds);
    },
    hydrateLikes: (state, action: PayloadAction<string[]>) => {
      state.likedIds = action.payload;
    },
  },
});

export const { recordItemRead, toggleLike, hydrateLikes } = analyticsSlice.actions;

export default analyticsSlice.reducer;
