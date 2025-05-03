import { createSlice } from "@reduxjs/toolkit";
import { ThemeOptions } from "@/theme/types";
import { THEME_PRESETS } from "@/theme/presets";

const prefersDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const initialState: ThemeOptions = {
  ...(prefersDarkMode ? THEME_PRESETS.dark : THEME_PRESETS.light),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      return state.mode === "light" ? THEME_PRESETS.dark : THEME_PRESETS.light;
    },
  },
});

export const { toggleMode } = themeSlice.actions;

export default themeSlice.reducer;
