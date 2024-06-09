import api from "../../api/api";
import { setRoutes, setRoutesCoords } from "./reducers/callsSlice";

export const getRoutesForTrace = async (dispatch, vehicle, route) => {
  const array = [];

  if (route == "route1") {
    vehicle.route1.data.forEach((el) => {
      const longitude = el.longitude.replace(",", ".");
      const latitude = el.latitude.replace(",", ".");
      array.push({
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      });
    });
  } else {
    vehicle.route2.data.forEach((el) => {
      const longitude = el.longitude.replace(",", ".");
      const latitude = el.latitude.replace(",", ".");
      array.push({
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      });
    });
  }

  const result = await getCoordsFromOSRM(array);

  dispatch(setRoutesCoords({ id: vehicle.id, coords: result, route }));
};

const getCoordsFromOSRM = async (coords) => {
  const coordinates = coords
    .map((coord) => `${coord.longitude},${coord.latitude}`)
    .join(";");

  let string =
    process.env.EXPO_PUBLIC_API_OSRM +
    `${coordinates}?overview=full&geometries=geojson`;

  try {
    const r = await api.get(string);

    if (
      r.data.routes &&
      r.data.routes &&
      r.data.routes.length > 0 &&
      r.data.routes[0].geometry &&
      r.data.routes[0].geometry.coordinates
    ) {
      return r.data.routes[0].geometry.coordinates;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRoutesInfo = async (dispatch, vehicle, setIsLoading) => {
  try {
    setIsLoading(true);
    const result = await api.get(
      process.env.EXPO_PUBLIC_API_URL +
        "timetables/routes-by-vehicle/" +
        vehicle.id
    );
    dispatch(setRoutes(result.data));
  } catch (error) {
    console.log(error);
  }
  setIsLoading(false);
};
