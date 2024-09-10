import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface UserState {
  userInfo: UserInfo | null;
  isSubscribed: boolean;
  endDate: string | null;
  loading: boolean;
  token: string | null;
}

const initialState: UserState = {
  userInfo: null,
  isSubscribed: false,
  endDate: null,
  loading: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
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
      state.userInfo = null;
      state.isSubscribed = false;
      state.endDate = null;
      state.token = null;
    },
  },
});

export const {
  setUser,
  setSubscribed,
  setEndDate,
  setLoading,
  setToken,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
