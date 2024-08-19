import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/mainSlice";
import settingsReducer from "./reducers/settingsSlice";
import locationReducer from "./reducers/locationSlice";
import routesReducer from "./reducers/routesSlice";
import cardsReducer from "./reducers/cardsSlice";
import buttonsReducer from "./reducers/buttonsSlice";

import myCustomApiService from "../../api/api";

const reducers = combineReducers({
  data: mainReducer,
  settings: settingsReducer,
  location: locationReducer,
  routes: routesReducer,
  cards: cardsReducer,
  buttons: buttonsReducer,
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
