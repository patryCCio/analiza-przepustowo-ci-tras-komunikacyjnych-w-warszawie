import { createSlice } from "@reduxjs/toolkit";

export const routesSlice = createSlice({
  name: "routes",
  initialState: {
    routes: null,
    startLocation: null,
    endLocation: null,
    isRide: false,
    routesCount: 0,
  },

  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
    setStartLocation: (state, action) => {
      state.startLocation = action.payload;
    },
    setEndLocation: (state, action) => {
      state.endLocation = action.payload;
    },
    setRoutesCount: (state, action) => {
      state.routesCount = action.payload;
    },
    setOtherRoutes: (state, action) => {
      if (action.payload.choice == "ride") {
        state.isRide = action.payload.data;
      }
    },
  },
});

export const {
  setRoutesCount,
  setRoutes,
  setEndLocation,
  setStartLocation,
  setOtherRoutes,
} = routesSlice.actions;
export default routesSlice.reducer;
