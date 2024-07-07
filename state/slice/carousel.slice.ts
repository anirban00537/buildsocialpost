import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generalSettings, Slide } from "@/types";
import { initialSlides } from "@/lib/data";

interface TextSettings {
  alignment: "left" | "center" | "right";
  fontSize: number;
  fontStyle: "normal" | "italic";
  fontWeight: number | string;
}

interface CarouselState {
  name: string;
  slides: Slide[];
  generalSettings: generalSettings;
  background: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
  };
  titleTextSettings: TextSettings;
  descriptionTextSettings: TextSettings;
  taglineTextSettings: TextSettings;
  layout: {
    height: number;
    width: number;
    pattern: string;
  };
}

const initialState: CarouselState = {
  name: "Default Carousel",
  slides: initialSlides,
  generalSettings: {
    headshotUrl: "https://avatars.githubusercontent.com/u/11111111?v=4",
    name: "Anirban Roy",
    handle: "@anirban00537",
  },
  background: {
    color1: "#1A1A1D", // Dark Charcoal
    color2: "#F4F4F4", // Light Gray
    color3: "#4E4E50", // Slate Gray
    color4: "#C3073F", // Red
  },
  titleTextSettings: {
    alignment: "left",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  descriptionTextSettings: {
    alignment: "left",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
  },
  taglineTextSettings: {
    alignment: "left",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
  },
  layout: {
    height: 640,
    width: 500,
    pattern: "/backgrounds/background1.svg",
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
        backgroundImage:
          "https://plus.unsplash.com/premium_photo-1681190675120-4d2e44599aab?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    addAllSlides: (state, action: PayloadAction<Slide[]>) => {
      state.slides = action.payload;
    },
    setTitleTextSettings: (state, action: PayloadAction<TextSettings>) => {
      state.titleTextSettings = action.payload;
    },
    setDescriptionTextSettings: (
      state,
      action: PayloadAction<TextSettings>
    ) => {
      state.descriptionTextSettings = action.payload;
    },
    setTaglineTextSettings: (state, action: PayloadAction<TextSettings>) => {
      state.taglineTextSettings = action.payload;
    },
    setLayoutHeightAndWidth: (
      state,
      action: PayloadAction<{ height: number; width: number }>
    ) => {
      state.layout.height = action.payload.height;
      state.layout.width = action.payload.width;
    },
    setBackground: (
      state,
      action: PayloadAction<{
        color1: string;
        color2: string;
        color3: string;
        color4: string;
      }>
    ) => {
      state.background = action.payload;
    },
    setPattern: (state, action: PayloadAction<string>) => {
      state.layout.pattern = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const {
  insertSlide,
  copySlide,
  deleteSlide,
  updateSlide,
  updateGeneralSettings,
  addAllSlides,
  setTitleTextSettings,
  setDescriptionTextSettings,
  setTaglineTextSettings,
  setLayoutHeightAndWidth,
  setBackground,
  setPattern,
  setName,
} = carouselSlice.actions;
export default carouselSlice.reducer;
