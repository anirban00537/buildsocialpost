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
    color1: "#081022", // Very Dark Blue
    color2: "#F7FAFC", // Almost White
    color3: "#2D3748", // Dark Grayish Blue
    color4: "#63B3ED", // Bright Blue
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
    glassMorphism: false,
    glassMorphismOpacity: 0.1,
    glassMorphismBlur: 10,
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
        showImage: false,
        showTagline: true,
        showTitle: true,
        showDescription: true,
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
      action: PayloadAction<{ index: number; updatedSlide: Partial<Slide> }>
    ) => {
      const { index, updatedSlide } = action.payload;
      state.slides[index] = { ...state.slides[index], ...updatedSlide };
    },
    removeBackgroundImage: (state, action: PayloadAction<number>) => {
      state.slides[action.payload].backgroundImage = null;
    },
    addAllSlides: (state, action: PayloadAction<Partial<Slide>[]>) => {
      state.slides = action.payload.map((slide) => ({
        title: "",
        description: "",
        type: "slide",
        showImage: slide.imageUrl ? true : false,
        showTagline: true,
        showTitle: true,
        showDescription: true,
        ...slide,
      }));
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
    setNewCarousel: (state) => {
      state.name = "New Carousel";
      state.slides = initialSlides;
      state.background = {
        color1: "#081022", // Very Dark Blue
        color2: "#F7FAFC", // Almost White
        color3: "#2D3748", // Dark Grayish Blue
        color4: "#63B3ED", // Bright Blue
      };
      state.sharedSelectedElement = {
        id: sharedElements[0].id,
        opacity: 0.5,
      };
      state.titleTextSettings = {
        alignment: "left",
        fontSize: 48,
        fontStyle: "normal",
        fontWeight: "bold",
      };
      state.descriptionTextSettings = {
        alignment: "left",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
      };
      state.taglineTextSettings = {
        alignment: "left",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
      };
      state.layout = {
        height: 600,
        width: 600,
        pattern: "/backgrounds/background1.svg",
        backgroundOpacity: 0.5,
        glassMorphism: false,
        glassMorphismOpacity: 0.1,
        glassMorphismBlur: 10,
      };
      state.fontFamily = "poppins";
      state.slides = initialSlides;
    },
    setGlassMorphism: (state, action: PayloadAction<boolean>) => {
      state.layout.glassMorphism = action.payload;
    },
    setGlassMorphismOpacity: (state, action: PayloadAction<number>) => {
      state.layout.glassMorphismOpacity = action.payload;
    },
    setGlassMorphismBlur: (state, action: PayloadAction<number>) => {
      state.layout.glassMorphismBlur = action.payload;
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
  setNewCarousel,
  removeBackgroundImage,
  setGlassMorphism,
  setGlassMorphismOpacity,
  setGlassMorphismBlur,
} = carouselSlice.actions;

export default carouselSlice.reducer;
