import api from "../../api/api";
import apiBusOSRM from "../../api/apiBusOSRM";
import apiTrainOSRM from "../../api/apiTrainOSRM";
import apiTramOSRM from "../../api/apiTramOSRM";

import { setTraces, setRoutes, setTimetable } from "./reducers/mainSlice";

const getCoords = async (type, string) => {
  let url = "";

  if (type != "Pieszo") {
    url = "/route/v1/driving/" + string + "?overview=full&geometries=geojson";
  } else {
    url = "/route/v1/walk/" + string + "?overview=full&geometries=geojson";
  }

  try {
    let r;

    if (type == "Autobus") {
      r = await apiBusOSRM.get(url);
    } else if (type == "Tramwaj") {
      r = await apiTramOSRM.get(url);
    } else if (type == "Pociąg") {
      r = await apiTrainOSRM.get(url);
    } else if (type == "Pieszo") {
      r = await apiBusOSRM.get(url);
    }

    if (
      r.data.routes &&
      r.data.routes &&
      r.data.routes.length > 0 &&
      r.data.routes[0].geometry &&
      r.data.routes[0].geometry.coordinates
    ) {
      const latLngs = r.data.routes[0].geometry.coordinates;

      const ready = latLngs.map((coord) => {
        return {
          latitude: coord[1],
          longitude: coord[0],
        };
      });

      const other_info = r.data.routes[0].legs.map((el, index) => {
        return {
          order: index,
          distance: el.distance,
          duration: el.duration,
          weight: el.weight,
        };
      });

      return {
        coordinates: ready,
        distance: other_info,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getRoutes = async (dispatch, vehicle, trace, stops) => {
  try {
    const result = await api.get("traces/get-route/" + trace.id);

    let string = "";

    const array = [];

    result.data.forEach((el2) => {
      stops.forEach((el) => {
        if (el.id == el2.stop_id) {
          array.push(el);
        }
      });
    });

    array.forEach((el, index) => {
      string += el.longitude + "," + el.latitude;
      if (index != array.length - 1) {
        string += ";";
      }
    });

    const coords = await getCoords(vehicle.type, string);

    console.log(coords);

    if (coords != null) {
      dispatch(
        setRoutes({
          routes: result.data,
          vehicle_id: vehicle.id,
          trace_id: trace.id,
          coords,
        })
      );
    } else {
      console.log("coś nie tak");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTraces = async (dispatch, vehicle) => {
  try {
    const result = await api.get("traces/get-traces/" + vehicle.id);
    dispatch(setTraces({ traces: result.data, id: vehicle.id }));
  } catch (error) {
    console.log(error);
  }
};

export const getAllData = async (data, type) => {
  let array = data;

  for (let x = 0; x < array.length; x++) {
    let string = "";
    for (let y = 0; y < array[x].routes.length; y++) {
      const longitude = array[x].routes[y].longitude;
      const latitude = array[x].routes[y].latitude;

      string += longitude + "," + latitude;

      if (y != array[x].routes.length - 1) {
        string += ";";
      }
    }
    const result = await getCoords(type, string);
    array[x].coords = result;
  }

  return array;
};
