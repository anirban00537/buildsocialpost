import { createSlice } from "@reduxjs/toolkit";

const initialSlides = [
  {
    title: "Amazing Catchy Title Goes Right Here!",
    subtitle: "Your amazing subtitle goes here",
    description: "Your amazing description goes here.",
    imageUrl:
      "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Section Title",
    subtitle: "Your amazing subtitle goes here",
    description: "Put your content here.",
    imageUrl:
      "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Section Title",
    subtitle: "Your amazing subtitle goes here",
    description: "Put your content here.",
    imageUrl:
      "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const slidesSlice = createSlice({
  name: "slides",
  initialState: initialSlides,
  reducers: {
    addSlide: (state) => {
      state.push({
        title: "New Slide",
        subtitle: "Subtitle",
        description: "Description",
        imageUrl:
          "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      });
    },
    copySlide: (state, action) => {
      state.push(state[action.payload]);
    },
    deleteSlide: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    updateSlide: (state, action) => {
      const { index, updatedSlide } = action.payload;
      state[index] = updatedSlide;
    },
  },
});

export const { addSlide, copySlide, deleteSlide, updateSlide } =
  slidesSlice.actions;

export default slidesSlice.reducer;
