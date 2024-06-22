import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userinfo: {},
  loggedin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.userinfo = action.payload;
      state.loggedin = true;
    },
    logout: (state) => {
      state.userinfo = {};
      state.loggedin = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
