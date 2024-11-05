import { UserInfo, UserState, Workspace, WordUsage, LinkedInProfile, SubscriptionState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  userinfo: null,
  loggedin: false,
  loading: true,
  carouselDownloading: false,
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
  subscription: {
    isSubscribed: false,
    plan: null,
    expiresAt: null,
    subscription: null,
    limits: {
      aiWordsPerMonth: 0,
      postsPerMonth: 0,
      imageUploads: 0,
      workspaces: 0,
      linkedInProfiles: 0,
      carousels: 0,
    },
  },
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
      state.linkedinProfiles = [];
      state.currentLinkedInProfile = null;
      state.subscription = initialState.subscription;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCarouselDownloading: (state, action: PayloadAction<boolean>) => {
      state.carouselDownloading = action.payload;
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
    setSubscriptionData: (state, action: PayloadAction<SubscriptionState>) => {
      state.subscription = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setUser,
  logout,
  setLoading,
  setCarouselDownloading,
  setCurrentWorkspace,
  setWordUsage,
  setLinkedInProfiles,
  setCurrentLinkedInProfile,
  setSubscriptionData,
} = userSlice.actions;
export default userSlice.reducer;
