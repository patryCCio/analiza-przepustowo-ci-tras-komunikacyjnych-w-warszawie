import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isStops: false,
    isStopsMap: false,
    isRouteZTMMap: false,
    isDistrictMap: false,

    routeNormal: false,
    routeFlow: false,
    routeDistrict: false,

    showStopsNormal: false,
  },

  reducers: {
    setSettings: (state, action) => {
      const { choice, data } = action.payload;

      if (choice == "stopsMap") {
        state.isStopsMap = data;
      } else if (choice == "routeZTMMap") {
        state.isRouteZTMMap = data;

        if (data == true) {
          state.routeNormal = data;
        } else {
          state.routeNormal = data;
          state.routeFlow = data;
          state.routeDistrict = data;
        }
      } else if (choice == "districtMap") {
        state.isDistrictMap = data;
      } else if (choice == "showStopsNormal") {
        state.showStopsNormal = data;
      } else if (choice == "all") {
        state.isStopsMap = data;
        state.isRouteZTMMap = data;
        state.isDistrictMap = data;
        state.showStopsNormal = data;
      }
    },
    setColors: (state, action) => {
      const choice = action.payload;

      if (choice == "routeNormal") {
        if (state.routeNormal) return;

        state.routeNormal = true;
        state.routeFlow = false;
        state.routeDistrict = false;
      } else if (choice == "routeFlow") {
        if (state.routeFlow) return;

        state.routeNormal = false;
        state.routeFlow = true;
        state.routeDistrict = false;
      } else if (choice == "routeDistrict") {
        if (state.routeDistrict) return;

        state.routeNormal = false;
        state.routeFlow = false;
        state.routeDistrict = true;
      }
    },
  },
});

export const { setSettings, setColors } = settingsSlice.actions;
export default settingsSlice.reducer;
