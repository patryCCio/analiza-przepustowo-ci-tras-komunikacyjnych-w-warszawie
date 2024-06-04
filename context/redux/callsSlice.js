import { createSlice } from "@reduxjs/toolkit";

export const callsSlice = createSlice({
  name: "data",
  initialState: {
    stops: [],
    localization: undefined,
  },

  reducers: {
    setStops: (state, action) => {
      state.stops = action.payload.data;
    },
  },
});

export const { setStops } = callsSlice.actions;
export default callsSlice.reducer;
