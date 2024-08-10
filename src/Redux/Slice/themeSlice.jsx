import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "bg-light text-dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme =
        state.theme === "bg-light text-dark"
          ? "bg-dark text-white"
          : "bg-light text-dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
