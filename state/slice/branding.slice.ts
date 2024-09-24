import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandingState {
  name: string;
  handle: string;
  headshot: string | null;
}

const initialState: BrandingState = {
  name: "Anirban Roy",
  handle: "@anirban00537",
  headshot:
    "https://firebasestorage.googleapis.com/v0/b/buildcarousel-4e9ec.appspot.com/o/user_headshots%2Fprofile-pic.png?alt=media&token=0e68a1fb-6359-4934-8930-b42351346d6b",
};

const brandingSlice = createSlice({
  name: "branding",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setHandle: (state, action: PayloadAction<string>) => {
      state.handle = action.payload;
    },
    setHeadshot: (state, action: PayloadAction<string | null>) => {
      state.headshot = action.payload;
    },
    setBranding: (
      state,
      action: PayloadAction<{
        name: string;
        handle: string;
        headshot: string | null;
      }>
    ) => {
      state.name = action.payload.name;
      state.handle = action.payload.handle;
      state.headshot = action.payload.headshot;
    },
  },
});

export const { setName, setHandle, setHeadshot, setBranding } =
  brandingSlice.actions;
export default brandingSlice.reducer;
