import { createSlice } from "@reduxjs/toolkit";

export const buttonsSlice = createSlice({
  name: "buttons",
  initialState: {
    gpsButton: true,
    gpsTrack: false,
    settingsButton: true,
    searchButton: true,
    ztmButton: true,
    colorsButton: false,
  },

  reducers: {
    setButtons: (state, action) => {
      const { choice, data } = action.payload;

      if (choice == "gpsButton") {
        state.gpsButton = data;
      } else if (choice == "gpsTrack") {
        state.gpsTrack = data;
      } else if (choice == "settingsButton") {
        state.settingsButton = data;
      } else if (choice == "searchButton") {
        state.searchButton = data;
      } else if (choice == "ztmButton") {
        state.ztmButton = data;
      } else if (choice == "colorsButton") {
        state.colorsButton = data;
      } else if (choice == "all") {
        state.gpsButton = data;
        state.gpsTrack = data;
        state.settingsButton = data;
        state.searchButton = data;
        state.ztmButton = data;
      }
    },
  },
});

export const { setButtons } = buttonsSlice.actions;
export default buttonsSlice.reducer;
