import { UserInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface UserState {
  userinfo: UserInfo | null;
  loggedin: boolean;
  loading: boolean;
  carouselDownloading: boolean;
  subscribed: boolean;
  endDate: string | null;
}

const initialState: UserState = {
  userinfo: null,
  loggedin: false,
  loading: true,
  carouselDownloading: false,
  subscribed: false,
  endDate: null,
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
} = userSlice.actions;
export default userSlice.reducer;
