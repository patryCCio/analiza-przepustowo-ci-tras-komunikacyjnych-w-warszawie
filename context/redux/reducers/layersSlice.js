import { createSlice } from "@reduxjs/toolkit";

export const layersSlice = createSlice({
  name: "layers",
  initialState: {
    isStops: false,
    isStopsMap: false,
    isTrafficFlowMap: false,
    isDistrictMap: false,
    isRouteZTMMap: false,
    isCardZTM: false,
  },

  reducers: {
    setOtherLayers: (state, action) => {
      if (action.payload.choice == "stops") {
        state.isStops = action.payload.data;
      } else if (action.payload.choice == "route") {
        state.isRouted = action.payload.data;
      } else if (action.payload.choice == "stopsMap") {
        state.isStopsMap = action.payload.data;
      } else if (action.payload.choice == "trafficFlowMap") {
        state.isTrafficFlowMap = action.payload.data;
      } else if (action.payload.choice == "routeZTMMap") {
        state.isRouteZTMMap = action.payload.data;
      } else if (action.payload.choice == "districtMap") {
        state.isDistrictMap = action.payload.data;
      } else if (action.payload.choice == "cardZTM") {
        state.isCardZTM = action.payload.data;
      }
    },
  },
});

export const { setOtherLayers } = layersSlice.actions;
export default layersSlice.reducer;
