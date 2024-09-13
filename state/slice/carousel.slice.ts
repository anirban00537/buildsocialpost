import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CarouselState,
  Slide,
  TextSettings,
  BackgroundColors,
  LayoutSettings,
} from "@/types";
import { initialSlides } from "@/lib/data";
import { sharedElements } from "@/lib/coreConstants";

const initialState: CarouselState = {
  name: "Default Carousel",
  slides: initialSlides,
  background: {
    color1: "#FFFFFF", // Pure White
    color2: "#2C3E50", // Dark Blue
    color3: "#ECF0F1", // Light Gray
    color4: "#3498DB", // Bright Blue
  },
  sharedSelectedElement: {
    id: sharedElements[0].id,
    opacity: 0.5,
  },
  titleTextSettings: {
    alignment: "left",
    fontSize: 48,
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
    height: 600,
    width: 600,
    pattern: "/backgrounds/background1.svg",
    backgroundOpacity: 0.5,
  },
  fontFamily: "poppins",
};

type UpdatePayload = {
  key: keyof CarouselState;
  value: any;
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    insertSlide: (state, action: PayloadAction<number>) => {
      const newSlide: Slide = {
        title: "New Slide",
        tagline: "New Tagline",
        description: "New Description",
        type: "slide",
      };
      state.slides.splice(action.payload, 0, newSlide);
    },
    copySlide: (state, action: PayloadAction<number>) => {
      const copiedSlide = { ...state.slides[action.payload] };
      state.slides.splice(action.payload + 1, 0, copiedSlide);
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
    setBackground: (state, action: PayloadAction<BackgroundColors>) => {
      state.background = action.payload;
    },
    setPattern: (state, action: PayloadAction<string>) => {
      state.layout.pattern = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setProperty: (state, action: PayloadAction<UpdatePayload>) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
    moveSlideLeft: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const temp = state.slides[index];
        state.slides[index] = state.slides[index - 1];
        state.slides[index - 1] = temp;
      }
    },
    moveSlideRight: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.slides.length - 1) {
        const temp = state.slides[index];
        state.slides[index] = state.slides[index + 1];
        state.slides[index + 1] = temp;
      }
    },
    setSharedSelectedElementId: (state, action: PayloadAction<number>) => {
      state.sharedSelectedElement.id = action.payload;
    },
    setSharedSelectedElementOpacity: (state, action: PayloadAction<number>) => {
      state.sharedSelectedElement.opacity = action.payload;
    },
    setBackgroundOpacity: (state, action: PayloadAction<number>) => {
      state.layout.backgroundOpacity = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
  },
});

export const {
  insertSlide,
  copySlide,
  deleteSlide,
  updateSlide,
  addAllSlides,
  setTitleTextSettings,
  setDescriptionTextSettings,
  setTaglineTextSettings,
  setLayoutHeightAndWidth,
  setBackground,
  setPattern,
  setName,
  setProperty,
  moveSlideLeft,
  moveSlideRight,
  setSharedSelectedElementId,
  setSharedSelectedElementOpacity,
  setBackgroundOpacity,
  setFontFamily,
} = carouselSlice.actions;

export default carouselSlice.reducer;
