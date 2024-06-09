import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducers/callsSlice";
import layersReducer from "./reducers/layersSlice";
import locationReducer from "./reducers/locationSlice";
import routesReducer from "./reducers/routesSlice";
import myCustomApiService from "../../api/api";

const reducers = combineReducers({
  data: dataReducer,
  layers: layersReducer,
  location: locationReducer,
  routes: routesReducer,
});

const store = configureStore({
  reducer: {
    root: reducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: myCustomApiService,
      },
      serializableCheck: false,
    }),
});

export default store;
