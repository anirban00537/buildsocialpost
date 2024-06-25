import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state
interface UserState {
  userinfo: any | null;
  loggedin: boolean;
  loading: boolean;
  subscribed: boolean;
  endDate: Date | null;
}

// Define the initial state using the UserState interface
const initialState: UserState = {
  userinfo: null,
  loggedin: false,
  loading: false,
  subscribed: false,
  endDate: null,
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
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSubscribed: (state, action: PayloadAction<boolean>) => {
      state.subscribed = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date | null>) => {
      state.endDate = action.payload;
    },
  },
});

// Export actions and reducer
export const { setUser, logout, setLoading, setSubscribed, setEndDate } =
  userSlice.actions;
export default userSlice.reducer;
