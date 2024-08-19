import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    settingsCard: false,
    searchCard: false,
    ztmCard: false,
    stopCard: false,
    ztmCardInfo: false,
  },

  reducers: {
    setCards: (state, action) => {
      const { choice, data } = action.payload;

      if (choice == "settingsCard") {
        state.settingsCard = data;
      } else if (choice == "searchCard") {
        state.searchCard = data;
      } else if (choice == "ztmCard") {
        state.ztmCard = data;
      } else if (choice == "stopCard") {
        state.stopCard = data;
      } else if (choice == "ztmCardInfo") {
        state.ztmCardInfo = data;
      } else if (choice == "all") {
        state.settingsCard = data;
        state.searchCard = data;
        state.ztmCard = data;
        state.stopCard = data;
        state.ztmCardInfo = data;
      }
    },
  },
});

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer;
