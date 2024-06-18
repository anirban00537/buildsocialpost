import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generalSettings, Slide } from "@/types";
import { initialSlides } from "@/lib/data";
import { Theme, themes } from "@/lib/theme";

interface CarouselState {
  slides: Slide[];
  generalSettings: generalSettings;
  themes: { [key: string]: Theme };
  selectedTheme: keyof typeof themes;
  textSettings: {
    alignment: "left" | "center" | "right";
    fontSize: number;
  };
}

const initialState: CarouselState = {
  slides: initialSlides,
  generalSettings: {
    headshotUrl: "https://avatars.githubusercontent.com/u/11111111?v=4",
    name: "Anirban Roy",
    handle: "@anirban00537",
  },
  themes,
  selectedTheme: "theme1",
  textSettings: {
    alignment: "center",
    fontSize: 14,
  },
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    insertSlide: (state, action: PayloadAction<number>) => {
      state.slides.splice(action.payload + 1, 0, {
        type: "slide",
        title: "New Slide " + (state.slides.length + 1),
        tagline: "tagline",
        description: "Description",
        imageUrl:
          "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      });
    },
    copySlide: (state, action: PayloadAction<number>) => {
      state.slides.push(state.slides[action.payload]);
    },
    deleteSlide: (state, action: PayloadAction<number>) => {
      state.slides.splice(action.payload, 1);
    },
    updateSlide: (
      state,
      action: PayloadAction<{ index: number; updatedSlide: Slide }>
    ) => {
      const { index, updatedSlide } = action.payload;
      state.slides[index] = updatedSlide;
    },
    updateGeneralSettings: (
      state,
      action: PayloadAction<{ updatedGeneralSettings: generalSettings }>
    ) => {
      const { updatedGeneralSettings } = action.payload;
      state.generalSettings = updatedGeneralSettings;
    },
    setSelectedTheme: (state, action: PayloadAction<keyof typeof themes>) => {
      state.selectedTheme = action.payload;
    },
    addAllSlides: (state, action: PayloadAction<Slide[]>) => {
      state.slides = action.payload;
    },
    setTextSettings: (
      state,
      action: PayloadAction<{
        alignment: "left" | "center" | "right";
        fontSize: number;
      }>
    ) => {
      state.textSettings = action.payload;
    },
  },
});

export const {
  insertSlide,
  copySlide,
  deleteSlide,
  updateSlide,
  updateGeneralSettings,
  setSelectedTheme,
  addAllSlides,
  setTextSettings,
} = carouselSlice.actions;
export default carouselSlice.reducer;
