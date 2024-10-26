import { UserInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userinfo: UserInfo | null;
  loggedin: boolean;
  loading: boolean;
  carouselDownloading: boolean;
  subscribed: boolean;
  endDate: string | null;
  currentWorkspace: {
    createdAt: string;
    description: string | null;
    id: number;
    isDefault: boolean;
    name: string;
    updatedAt: string;
    userId: number;
  } | null;
}

const initialState: UserState = {
  userinfo: null,
  loggedin: false,
  loading: true,
  carouselDownloading: false,
  subscribed: false,
  endDate: null,
  currentWorkspace: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userinfo = action.payload;
      state.loggedin = true;
    },
    logout: (state) => {
      state.userinfo = null;
      state.loggedin = false;
      state.subscribed = false;
      state.endDate = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCarouselDownloading: (state, action: PayloadAction<boolean>) => {
      state.carouselDownloading = action.payload;
    },
    setSubscribed: (state, action: PayloadAction<boolean>) => {
      state.subscribed = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    setCurrentWorkspace: (state, action: PayloadAction<any>) => {
      state.currentWorkspace = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setUser,
  logout,
  setLoading,
  setSubscribed,
  setEndDate,
  setCarouselDownloading,
  setCurrentWorkspace,
} = userSlice.actions;
export default userSlice.reducer;
