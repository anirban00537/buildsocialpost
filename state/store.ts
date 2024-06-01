import { configureStore } from "@reduxjs/toolkit";
import slidesReducer from "@/state/slice/carousel.slice";

export const store = configureStore({
  reducer: {
    slides: slidesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
