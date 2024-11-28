import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state
interface UserState {
  userinfo: any | null;
  loggedin: boolean;
  loading: boolean;
  carouselDownloading: boolean;
  subscribed: boolean;
  endDate: string | null;
  monthlyGenerations: number;
  lastGenerationReset: string | null;
}

// Define the initial state using the UserState interface
const initialState: UserState = {
  userinfo: null,
  loggedin: false,
  loading: true,
  carouselDownloading: false,
  subscribed: false,
  endDate: null,
  monthlyGenerations: 0,
  lastGenerationReset: null,
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.userinfo = action.payload;
      state.loggedin = true;
    },
    logout: (state) => {
      state.userinfo = null;
      state.loggedin = false;
      state.subscribed = false;
      state.endDate = null;
      state.monthlyGenerations = 0;
      state.lastGenerationReset = null;
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
    incrementGenerations: (state) => {
      const now = new Date();
      const resetDate = state.lastGenerationReset ? new Date(state.lastGenerationReset) : null;
      
      // Check if we need to reset the counter (new month)
      if (!resetDate || now.getMonth() !== resetDate.getMonth() || now.getFullYear() !== resetDate.getFullYear()) {
        state.monthlyGenerations = 1;
        state.lastGenerationReset = now.toISOString();
      } else {
        state.monthlyGenerations += 1;
      }
    },
    resetGenerations: (state) => {
      state.monthlyGenerations = 0;
      state.lastGenerationReset = new Date().toISOString();
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
  incrementGenerations,
  resetGenerations,
} = userSlice.actions;
export default userSlice.reducer;
