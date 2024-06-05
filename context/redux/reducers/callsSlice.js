import { createSlice } from "@reduxjs/toolkit";

export const callsSlice = createSlice({
  name: "data",
  initialState: {
    stops: [],
    districts: [],
    routesZTM: []
  },

  reducers: {
    setStops: (state, action) => {
      state.stops = action.payload;
    },
    setDistricts: (state, action) => {
      state.districts = action.payload;
    },
  },
});

export const { setStops, setDistricts } = callsSlice.actions;
export default callsSlice.reducer;
