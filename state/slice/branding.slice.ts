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
    "https://media.licdn.com/dms/image/C5603AQEGjGbIz_n7mA/profile-displayphoto-shrink_800_800/0/1643437924436?e=1726099200&v=beta&t=cJq3oK2YOYazN-UuiZXktITe5eTES1J_I_yS9na7tqw",
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
