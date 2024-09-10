import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state
interface UserState {
  userinfo: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
  isSubscribed: boolean;
  endDate: string | null;
  loading: boolean;
  token: string | null;
}

// Define the initial state using the UserState interface
const initialState: UserState = {
  userinfo: null,
  isSubscribed: false,
  endDate: null,
  loading: true,
  token: null,
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["userinfo"]>) => {
      state.userinfo = action.payload;
    },
    setSubscribed: (state, action: PayloadAction<boolean>) => {
      state.isSubscribed = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.userinfo = null;
      state.isSubscribed = false;
      state.endDate = null;
      state.token = null;
    },
  },
});

// Export actions and reducer
export const {
  setUser,
  setSubscribed,
  setEndDate,
  setLoading,
  setToken,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
