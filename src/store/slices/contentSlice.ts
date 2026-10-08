import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ContentItem, ContentType } from "@/types/content";
import { mockContentDataset } from "@/lib/mockData";
import { saveStoredOrder } from "@/lib/storage";

interface FetchFeedParams {
  categories?: string[];
  type?: string;
  query?: string;
  page?: number;
  limit?: number;
  append?: boolean;
}

export const fetchFeedContent = createAsyncThunk(
  "content/fetchFeedContent",
  async (params: FetchFeedParams = {}, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();
      if (params.categories && params.categories.length > 0) {
        searchParams.set("categories", params.categories.join(","));
      }
      if (params.type && params.type !== "all") {
        searchParams.set("type", params.type);
      }
      if (params.query) {
        searchParams.set("q", params.query);
      }
      if (params.page) {
        searchParams.set("page", params.page.toString());
      }
      if (params.limit) {
        searchParams.set("limit", params.limit.toString());
      }

      // Check if we are in browser to fetch API route, otherwise fallback to local mock
      if (typeof window !== "undefined") {
        const res = await fetch(`/api/feed?${searchParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch feed");
        const json = await res.json();
        return {
          data: json.data as ContentItem[],
          pagination: json.pagination,
          append: !!params.append,
        };
      } else {
        // Fallback for SSR or tests
        return {
          data: mockContentDataset,
          pagination: { page: 1, limit: 12, total: mockContentDataset.length, totalPages: 1, hasMore: false },
          append: false,
        };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load feed";
      return rejectWithValue(message);
    }
  }
);

interface ContentState {
  items: ContentItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  activeType: ContentType | "all";
  activeCategory: string; // 'all' or specific category
  searchQuery: string;
  customOrder: string[]; // IDs in reordered sequence
  page: number;
  hasMore: boolean;
  isLiveSimulationActive: boolean;
  pendingLiveItems: ContentItem[];
}

const initialState: ContentState = {
  items: mockContentDataset,
  status: "succeeded",
  error: null,
  activeType: "all",
  activeCategory: "all",
  searchQuery: "",
  customOrder: [],
  page: 1,
  hasMore: false,
  isLiveSimulationActive: true,
  pendingLiveItems: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setActiveType: (state, action: PayloadAction<ContentType | "all">) => {
      state.activeType = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    reorderItems: (state, action: PayloadAction<string[]>) => {
      state.customOrder = action.payload;
      saveStoredOrder(action.payload);
      
      // Re-sort items in state to match the custom order
      const orderMap = new Map(action.payload.map((id, index) => [id, index]));
      state.items.sort((a, b) => {
        const orderA = orderMap.has(a.id) ? orderMap.get(a.id)! : 9999;
        const orderB = orderMap.has(b.id) ? orderMap.get(b.id)! : 9999;
        return orderA - orderB;
      });
    },
    resetOrder: (state) => {
      state.customOrder = [];
      saveStoredOrder([]);
      // Sort back by publishedAt date
      state.items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    },
    toggleLiveSimulation: (state) => {
      state.isLiveSimulationActive = !state.isLiveSimulationActive;
    },
    receiveLiveItem: (state, action: PayloadAction<ContentItem>) => {
      const exists = state.items.some((i) => i.id === action.payload.id) ||
                     state.pendingLiveItems.some((i) => i.id === action.payload.id);
      if (!exists) {
        state.pendingLiveItems.unshift(action.payload);
      }
    },
    applyPendingLiveItems: (state) => {
      if (state.pendingLiveItems.length > 0) {
        state.items = [...state.pendingLiveItems, ...state.items];
        state.pendingLiveItems = [];
      }
    },
    dismissLiveItem: (state, action: PayloadAction<string>) => {
      state.pendingLiveItems = state.pendingLiveItems.filter((i) => i.id !== action.payload);
    },
    incrementLike: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.likes += 1;
      }
    },
    setItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    hydrateCustomOrder: (state, action: PayloadAction<string[]>) => {
      state.customOrder = action.payload;
      if (action.payload.length > 0) {
        const orderMap = new Map(action.payload.map((id, index) => [id, index]));
        state.items.sort((a, b) => {
          const orderA = orderMap.has(a.id) ? orderMap.get(a.id)! : 9999;
          const orderB = orderMap.has(b.id) ? orderMap.get(b.id)! : 9999;
          return orderA - orderB;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedContent.pending, (state, action) => {
        if (!action.meta.arg?.append) {
          state.status = "loading";
        }
        state.error = null;
      })
      .addCase(fetchFeedContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data, pagination, append } = action.payload;
        if (append) {
          // Append unique items
          const existingIds = new Set(state.items.map((i) => i.id));
          const newItems = data.filter((item) => !existingIds.has(item.id));
          state.items.push(...newItems);
        } else {
          state.items = data;
        }

        if (pagination) {
          state.page = pagination.page;
          state.hasMore = pagination.hasMore;
        }
      })
      .addCase(fetchFeedContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to fetch content";
      });
  },
});

export const {
  setActiveType,
  setActiveCategory,
  setSearchQuery,
  reorderItems,
  resetOrder,
  toggleLiveSimulation,
  receiveLiveItem,
  applyPendingLiveItems,
  dismissLiveItem,
  incrementLike,
  setItems,
  hydrateCustomOrder,
} = contentSlice.actions;

export default contentSlice.reducer;
