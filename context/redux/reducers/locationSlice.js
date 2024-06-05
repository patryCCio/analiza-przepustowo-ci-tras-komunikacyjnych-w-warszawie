import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: undefined,
    isLocationActive: false,
    wantToShareLocation: false,
    followGPS: false,
  },

  reducers: {
    setOtherLocation: (state, action) => {
      if (action.payload.choice == "location") {
        state.location = action.payload.data;
      } else if (action.payload.choice == "share") {
        state.wantToShareLocation = action.payload.data;
      } else if (action.payload.choice == "follow") {
        state.followGPS = action.payload.data;
      } else if (action.payload.choice == "locationActive") {
        state.isLocationActive = action.payload.data;
      }
    },
  },
});

export const { setOtherLocation } = locationSlice.actions;
export default locationSlice.reducer;
