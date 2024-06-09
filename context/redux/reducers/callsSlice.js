import { createSlice } from "@reduxjs/toolkit";

export const callsSlice = createSlice({
  name: "data",
  initialState: {
    stops: [],
    districts: [],
    ztm: [],
  },

  reducers: {
    setStops: (state, action) => {
      state.stops = action.payload;
    },
    setDistricts: (state, action) => {
      state.districts = action.payload;
    },
    setZTM: (state, action) => {
      state.ztm = action.payload;
    },

    setRoutes: (state, action) => {
      const data = [];
      state.ztm.forEach((el) => {
        if (el.id == action.payload.route1[0].vehicle_id) {
          data.push({
            ...el,
            route1: {
              is_active: false,
              data:
                action.payload.route1.length > 0 ? action.payload.route1 : null,
            },
            route2: {
              is_active: false,
              data:
                action.payload.route2.length > 0 ? action.payload.route2 : null,
            },
          });
        } else {
          data.push({
            ...el,
          });
        }

        state.ztm = data;
      });
    },
    setRoutesCoords: (state, action) => {
      const array = state.ztm.map((el) => {
        if (el.id == action.payload.id) {
          if (action.payload.route == "route1") {
            return {
              ...el,
              route1_coords: action.payload.coords,
            };
          } else {
            return {
              ...el,
              route2_coords: action.payload.coords,
            };
          }
        } else {
          return el;
        }
      });
      state.ztm = array;
    },
    setIsActive: (state, action) => {
      const array = state.ztm.map((el) => {
        if (el.id == action.payload) {
          if (el.route1) {
            return {
              ...el,
              is_active: !el.is_active,
              route1: {
                ...el.route1,
                is_active: false,
              },
              route2: {
                ...el.route2,
                is_active: false,
              },
            };
          } else {
            return {
              ...el,

              is_active: !el.is_active,
            };
          }
        } else {
          return el;
        }
      });

      state.ztm = array;
    },
    setIsActiveRoute: (state, action) => {
      const array = state.ztm.map((el) => {
        if (el.id == action.payload.id) {
          if (action.payload.route == "route1") {
            return {
              ...el,
              route1: {
                ...el.route1,
                is_active: !el.route1.is_active,
              },
            };
          } else {
            return {
              ...el,
              route2: {
                ...el.route2,
                is_active: !el.route2.is_active,
              },
            };
          }
        } else {
          return el;
        }
      });
      state.ztm = array;
    },
  },
});

export const {
  setStops,
  setDistricts,
  setZTM,
  setIsActive,
  setRoutes,
  setRoutesCoords,
  setIsActiveRoute,
} = callsSlice.actions;
export default callsSlice.reducer;
