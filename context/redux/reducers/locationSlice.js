import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: undefined,
    isLocationActive: false,
    followGPS: false,
    isRouted: false,
  },

  reducers: {
    setOtherLocation: (state, action) => {
      const { choice, data } = action.payload;

      if (choice == "location") {
        state.location = data;
      } else if (choice == "follow") {
        state.followGPS = data;
      } else if (choice == "locationActive") {
        state.isLocationActive = data;
      } else if (choice == "routed") {
        state.isRouted = data;
      } else if (choice == "all") {
        state.isLocationActive = data;
        state.followGPS = data;
        state.isRouted = data;
      }
    },
  },
});

export const { setOtherLocation } = locationSlice.actions;
export default locationSlice.reducer;
