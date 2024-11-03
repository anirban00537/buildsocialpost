import { UserInfo, UserState, Workspace, WordUsage, LinkedInProfile } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  userinfo: null,
  loggedin: false,
  loading: true,
  carouselDownloading: false,
  subscribed: false,
  endDate: null,
  currentWorkspace: null,
  wordUsage: {
    usage: {
      used: 0,
      remaining: 2000,
      total: 2000,
      isActive: true,
      expirationDate: null,
    },
    percentage: {
      used: 0,
      remaining: 100,
    },
  },
  linkedinProfiles: [],
  currentLinkedInProfile: null,
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
      state.linkedinProfiles = [];
      state.currentLinkedInProfile = null;
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
    setWordUsage: (state, action: PayloadAction<WordUsage>) => {
      state.wordUsage = action.payload;
    },
    setLinkedInProfiles: (state, action: PayloadAction<LinkedInProfile[]>) => {
      state.linkedinProfiles = action.payload;
      if (!state.currentLinkedInProfile && action.payload.length > 0) {
        state.currentLinkedInProfile = action.payload[0];
      }
    },
    setCurrentLinkedInProfile: (state, action: PayloadAction<LinkedInProfile | null>) => {
      state.currentLinkedInProfile = action.payload;
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
  setWordUsage,
  setLinkedInProfiles,
  setCurrentLinkedInProfile,
} = userSlice.actions;
export default userSlice.reducer;
