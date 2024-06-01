import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Slide } from "@/types";
import { initialSlides } from "@/lib/data";

const carouselSlice = createSlice({
  name: "carousel",
  initialState: initialSlides,
  reducers: {
    insertSlide: (state, action: PayloadAction<number>) => {
      state.splice(action.payload + 1, 0, {
        title: "New Slideeeee" + state.length + 1,
        subtitle: "Subtitle",
        description: "Description",
        imageUrl:
          "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        headshotUrl: "https://thispersondoesnotexist.com",
        name: "Anirban Roy",
        handle: "anirban00537",
      });
    },
    copySlide: (state, action: PayloadAction<number>) => {
      state.push(state[action.payload]);
    },
    deleteSlide: (state, action: PayloadAction<number>) => {
      return state.filter((_, index) => index !== action.payload);
    },
    updateSlide: (
      state,
      action: PayloadAction<{ index: number; updatedSlide: Slide }>
    ) => {
      const { index, updatedSlide } = action.payload;
      state[index] = updatedSlide;
    },
  },
});

export const { insertSlide, copySlide, deleteSlide, updateSlide } =
  carouselSlice.actions;
export default carouselSlice.reducer;
