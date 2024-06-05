import { createSlice } from "@reduxjs/toolkit";

export const layersSlice = createSlice({
  name: "layers",
  initialState: {
    isSearch: false,
    isInfo: false,
    isSettings: false,
    isRouted: false,
    isStops: false,
    isStopsMap: false,
    isTrafficFlowMap: false,
    infoMessage: null,
    isDistrictMap: false,
    isRouteZTMMap: false,
  },

  reducers: {
    setOtherLayers: (state, action) => {
      if (action.payload.choice == "search") {
        state.isSearch = action.payload.data;
      } else if (action.payload.choice == "info") {
        state.isInfo = action.payload.data;
      } else if (action.payload.choice == "settings") {
        state.isSettings = action.payload.data;
      } else if (action.payload.choice == "stops") {
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
      }
    },
    setInfoMessage: (state, action) => {
      state.infoMessage = action.payload;
    },
  },
});

export const { setOtherLayers, setInfoMessage } = layersSlice.actions;
export default layersSlice.reducer;
