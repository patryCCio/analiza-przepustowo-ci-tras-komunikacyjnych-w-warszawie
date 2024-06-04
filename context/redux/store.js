import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./callsSlice";

export default configureStore({
  reducer: {
    data: dataReducer
  },
});
