import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "data",
  initialState: {
    stops: [],
    districts: [],
    vehicles: [],
  },

  reducers: {
    setVehicles: (state, action) => {
      const array = action.payload.map((el) => {
        return {
          ...el,
          is_active: false,
        };
      });

      state.vehicles = array;
    },
    setStops: (state, action) => {
      state.stops = action.payload;
    },
    setDistricts: (state, action) => {
      state.districts = action.payload;
    },
    setTraces: (state, action) => {
      const { traces, id } = action.payload;

      const newTraces = traces.map((el) => {
        return {
          ...el,
          is_active: false,
        };
      });

      const array = state.vehicles.map((el) => {
        if (el.id == id) {
          return {
            ...el,
            traces: newTraces,
          };
        } else return el;
      });

      state.vehicles = array;
    },
    setRoutes: (state, action) => {
      const { vehicle_id, routes, trace_id, coords } = action.payload;

      const array = state.vehicles.map((el) => {
        if (el.id == vehicle_id) {
          const traces = el.traces.map((el2) => {
            if (el2.id == trace_id) {
              return {
                ...el2,
                routes,
                coords,
              };
            } else return el2;
          });

          return {
            ...el,
            traces,
          };
        } else return el;
      });

      state.vehicles = array;
    },
    setIsActiveVehicle: (state, action) => {
      const id = action.payload;

      const array = state.vehicles.map((el) => {
        if (el.id == id) {
          if (el.is_active) {
            const traces = el.traces.map((el2) => {
              return {
                ...el2,
                is_active: false,
              };
            });

            return {
              ...el,
              traces,
              is_active: false,
            };
          } else {
            return {
              ...el,
              is_active: !el.is_active,
            };
          }
        } else return el;
      });
      state.vehicles = array;
    },
    setIsActiveTrace: (state, action) => {
      const { vehicle_id, trace_id } = action.payload;

      const array = state.vehicles.map((el) => {
        if (el.id == vehicle_id) {
          const traces = el.traces.map((el2) => {
            if (el2.id == trace_id) {
              return {
                ...el2,
                is_active: !el2.is_active,
              };
            } else {
              return el2;
            }
          });

          return {
            ...el,
            traces,
          };
        } else {
          return el;
        }
      });

      state.vehicles = array;
    },
    setAllActivesFalse: (state, action) => {
      const array = state.vehicles.map((el) => {
        const arr2 = [];

        if (el.traces) {
          el.traces.forEach((el2) => {
            arr2.push({
              ...el2,
              is_active: false,
            });
          });
          return {
            ...el,
            is_active: false,
            traces: arr2,
          };
        } else {
          return {
            ...el,
            is_active: false,
          };
        }
      });

      state.vehicles = array;
    },
    setTimetable: (state, action) => {
      const { routes, trace_id, vehicle_id } = action.payload;

      const array = [];
      state.vehicles.forEach((el) => {
        if (el.id == vehicle_id) {
          const traces = [];
          el.traces.forEach((el2) => {
            if (el2.id == trace_id) {
              traces.push({
                ...el2,
                routes: routes.sort((a, b) => a.order - b.order),
              });
            } else traces.push(el2);
          });

          array.push({ ...el, traces: traces });
        } else array.push(el);
      });

      state.vehicles = array;
    },
    setTracesFromFullData: (state, action) => {
      const { traces, vehicle_id } = action.payload;

      const array = state.vehicles.map((el) => {
        if (el.id == vehicle_id) {
          return {
            ...el,
            traces: traces,
          };
        } else return el;
      });

      state.vehicles = array;
    },
  },
});

export const {
  setStops,
  setDistricts,
  setVehicles,
  setIsActiveVehicle,
  setIsActiveTrace,
  setTraces,
  setRoutes,
  setAllActivesFalse,
  setTimetable,
  setTracesFromFullData,
} = mainSlice.actions;
export default mainSlice.reducer;
