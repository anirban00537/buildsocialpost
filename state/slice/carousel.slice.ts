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
    color1: "#1A1A1D",
    color2: "#F4F4F4",
    color3: "#4E4E50",
    color4: "#C3073F",
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
    height: 640,
    width: 500,
    pattern: "/backgrounds/background1.svg",
    backgroundOpacity: 0.5,
  },
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
} = carouselSlice.actions;

export default carouselSlice.reducer;
