import api from "../../api/api";
import apiBusOSRM from "../../api/apiBusOSRM";
import apiTrainOSRM from "../../api/apiTrainOSRM";
import apiTramOSRM from "../../api/apiTramOSRM";

import { setTraces, setRoutes, setTrafficFlow } from "./reducers/mainSlice";

const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon1 - lon2) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const getFlowForTraces = async (
  vehiclesArray,
  traffic_flow,
  order_time
) => {
  const trafficFlow = traffic_flow.filter((el) => el.order_time == order_time);

  const maxDistance = 100;

  return await vehiclesArray.map((el) => {
    const coords = el.coords.coordinates.map((coord, index) => {
      let closestFlow = null;
      let minDistance = Infinity;

      trafficFlow.forEach((flow) => {
        const distance = getDistanceFromLatLonInMeters(
          coord.latitude,
          coord.longitude,
          flow.latitude,
          flow.longitude
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestFlow = flow;
        }
      });

      return minDistance > maxDistance
        ? { ...closestFlow, ...coord, speed: null }
        : { ...closestFlow, ...coord };
    });

    return {
      ...el,
      coords: {
        distance: el.coords.distance,
        coordinates: coords,
      },
    };
  });
};

export const getColorBySpeed = (speed) => {
  if (speed === null) return "gray";
  if (speed < 10) return "#8f0909";
  if (speed < 25) return "orangered";
  if (speed < 40) return "gold";
  if (speed < 55) return "green";
  return "royalblue";
};

export const getAllStops = async (vehicles, stops, type) => {
  const stopsArray = [];

  if (type == "all") {
    await vehicles.forEach((el) => {
      if (el.is_active && el.traces) {
        el.traces.forEach((el2) => {
          if (el2.routes && el2.coords) {
            const nameF = el2.coords.coordinates[0]?.name;
            const nameL =
              el2.coords.coordinates[el2.coords.coordinates.length - 1]?.name;

            el2.routes.forEach((el3) => {
              stops.forEach((stopp) => {
                if (stopp.id === el3.stop_id) {
                  stopsArray.push({
                    route: el.route,
                    stop_from: el2.stop_from,
                    stop_end: el2.stop_end,
                    ...stopp,
                    latitude: parseFloat(stopp.latitude),
                    longitude: parseFloat(stopp.longitude),
                    order: el3.order,
                    name_district: el3.order === 0 ? nameF : nameL,
                  });
                }
              });
            });
          }
        });
      }
    });
  } else {
    await vehicles.forEach((el) => {
      if (el.is_active && el.traces) {
        el.traces.forEach((el2) => {
          if (el2.routes && el2.coords) {
            const nameF = el2.coords.coordinates[0]?.name;
            const nameL =
              el2.coords.coordinates[el2.coords.coordinates.length - 1]?.name;

            el2.routes.forEach((el3) => {
              if (el3.order === 0 || el3.order === el2.routes.length - 1) {
                stops.forEach((stopp) => {
                  if (stopp.id === el3.stop_id) {
                    stopsArray.push({
                      route: el.route,
                      stop_from: el2.stop_from,
                      stop_end: el2.stop_end,
                      ...stopp,
                      longitude: parseFloat(stopp.longitude),
                      latitude: parseFloat(stopp.latitude),
                      order: el3.order,
                      name_district: el3.order === 0 ? nameF : nameL,
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  return stopsArray;
};

export const getAllActiveVehicles = async (vehicles) => {
  const vehiclesArray = [];

  await vehicles.forEach((el) => {
    if (el.is_active && el.traces) {
      el.traces.forEach((el2) => {
        if (el2.is_active && el2.coords) {
          vehiclesArray.push({
            route: el.route,
            capacity: el.capacity,
            ...el2,
            vehicle_id: el.id,
            trace_id: el2.id,
          });
        }
      });
    }
  });

  return vehiclesArray;
};

export const isCoordinateInRegion = (coordinate, region) => {
  const { latitude, longitude } = coordinate;
  const {
    latitudeDelta,
    longitudeDelta,
    latitude: regionLat,
    longitude: regionLon,
  } = region;

  const latInRange =
    latitude >= regionLat - latitudeDelta / 2 &&
    latitude <= regionLat + latitudeDelta / 2;
  const lonInRange =
    longitude >= regionLon - longitudeDelta / 2 &&
    longitude <= regionLon + longitudeDelta / 2;

  return latInRange && lonInRange;
};

const isPointInPolygon = (point, polygon) => {
  let x = point.longitude,
    y = point.latitude;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i].longitude,
      yi = polygon[i].latitude;
    let xj = polygon[j].longitude,
      yj = polygon[j].latitude;
    let intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

const getCoords = async (type, string, districts) => {
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

      const ready = latLngs.map((coord, index) => {
        const point = { latitude: coord[1], longitude: coord[0] };
        let districtInfo = { name: "Poza Warszawą", population_density: 400 };

        for (const district of districts) {
          if (isPointInPolygon(point, district.border_coords)) {
            districtInfo = {
              name: district.name,
              population_density: district.population_density,
            };
            break;
          }
        }

        return {
          latitude: point.latitude,
          longitude: point.longitude,
          order: index,
          name: districtInfo.name,
          population_density: districtInfo.population_density,
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

export const refactorAllTrafficFlowData = (dispatch, data) => {
  const trafficFlow = [];
  data.results.forEach((result, index) => {
    result.location.shape.links.forEach((lnk, index2) => {
      lnk.points.forEach((pnt, index3) => {
        trafficFlow.push({
          tr_id: index,
          lnk_id: index2,
          pnt_id: index3,
          ...result.currentFlow,
          longitude: pnt.lng,
          latitude: pnt.lat,
          order_time: 0,
        });
      });
    });
  });

  dispatch(setTrafficFlow(trafficFlow));
};

export const getRoutes = async (dispatch, vehicle, trace, stops, districts) => {
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

    const coords = await getCoords(vehicle.type, string, districts);

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

export const getAllData = async (data, type, districts) => {
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
    const result = await getCoords(type, string, districts);
    array[x].coords = result;
  }

  return array;
};

export const calculateTimeDifference = (time1, time2) => {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  let diffMinutes = totalMinutes2 - totalMinutes1;

  const hours = Math.floor(Math.abs(diffMinutes) / 60);
  const minutes = Math.abs(diffMinutes) % 60;

  return { hours, minutes };
};
