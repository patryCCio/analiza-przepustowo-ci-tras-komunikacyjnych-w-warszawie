import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducers/callsSlice";
import layersReducer from "./reducers/layersSlice";
import locationReducer from "./reducers/locationSlice";
import routesReducer from "./reducers/routesSlice";

const reducers = combineReducers({
  data: dataReducer,
  layers: layersReducer,
  location: locationReducer,
  routes: routesReducer
});

const store = configureStore({
  reducer: {
    root: reducers,
  },
});

export default store;
