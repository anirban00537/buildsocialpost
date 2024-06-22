import { configureStore } from "@reduxjs/toolkit";
import slidesReducer from "@/state/slice/carousel.slice";
import userSlice from "./slice/user.slice";

export const store = configureStore({
  reducer: {
    slides: slidesReducer,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
