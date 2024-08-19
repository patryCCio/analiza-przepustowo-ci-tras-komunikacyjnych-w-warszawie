import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isStops: false,
    isStopsMap: false,
    isRouteZTMMap: false,
    isDistrictMap: false,
  },

  reducers: {
    setSettings: (state, action) => {
      const { choice, data } = action.payload;

      if (choice == "stopsMap") {
        state.isStopsMap = data;
      } else if (choice == "routeZTMMap") {
        state.isRouteZTMMap = data;
      } else if (choice == "districtMap") {
        state.isDistrictMap = data;
      } else if (choice == "all") {
        state.isStopsMap = data;
        state.isRouteZTMMap = data;
        state.isDistrictMap = data;
      }
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
