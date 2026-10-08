import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types/content";
import { initialUserProfile } from "@/lib/mockData";

interface AuthState {
  user: UserProfile;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: initialUserProfile,
  isAuthenticated: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    loginAsGuest: (state) => {
      state.user = initialUserProfile;
      state.isAuthenticated = true;
    },
  },
});

export const { setUser, updateUserProfile, logout, loginAsGuest } = authSlice.actions;

export default authSlice.reducer;
