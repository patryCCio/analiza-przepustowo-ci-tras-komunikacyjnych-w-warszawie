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

export const getColorBySpeed = (speed) => {
  if (speed === null) return "gray";

  // Przeliczenie prędkości z m/s na km/h
  const speedKmH = speed * 3.6;

  if (speedKmH < 10) return "#8f0909";
  if (speedKmH < 25) return "orangered";
  if (speedKmH < 40) return "gold";
  if (speedKmH < 55) return "green";
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

// exhibit 10-5
export const getRoadClass = (freeFlow) => {
  const kmh = freeFlow * 3.6;

  if (kmh >= 80) return "I";
  if (kmh >= 65) return "II";
  if (kmh >= 55) return "III";

  return "IV";
};

// exhibit 15-2
export const getLOSClass = (road_class, avgSpeed) => {
  const kmh = avgSpeed * 3.6;
  switch (road_class) {
    case "I":
      if (kmh <= 26) {
        return "F";
      } else if (kmh > 26 && kmh <= 32) {
        return "E";
      } else if (kmh > 32 && kmh <= 40) {
        return "D";
      } else if (kmh > 40 && kmh <= 56) {
        return "C";
      } else if (kmh > 56 && kmh <= 72) {
        return "B";
      } else {
        return "A";
      }

    case "II":
      if (kmh <= 21) {
        return "F";
      } else if (kmh > 21 && kmh <= 26) {
        return "E";
      } else if (kmh > 26 && kmh <= 33) {
        return "D";
      } else if (kmh > 33 && kmh <= 46) {
        return "C";
      } else if (kmh > 46 && kmh <= 59) {
        return "B";
      } else {
        return "A";
      }

    case "III":
      if (kmh <= 17) {
        return "F";
      } else if (kmh > 17 && kmh <= 22) {
        return "E";
      } else if (kmh > 22 && kmh <= 28) {
        return "D";
      } else if (kmh > 28 && kmh <= 39) {
        return "C";
      } else if (kmh > 39 && kmh <= 50) {
        return "B";
      } else {
        return "A";
      }

    case "IV":
      if (kmh <= 14) {
        return "F";
      } else if (kmh > 14 && kmh <= 18) {
        return "E";
      } else if (kmh > 18 && kmh <= 23) {
        return "D";
      } else if (kmh > 23 && kmh <= 32) {
        return "C";
      } else if (kmh > 32 && kmh <= 41) {
        return "B";
      } else {
        return "A";
      }
  }
};

const getLaneWidth = (roadType) => {
  switch (roadType) {
    case "residential": // Drogi lokalne
    case "service":
      return 2.75;
    case "primary": // Drogi główne, arterie miejskie
    case "secondary":
      return 3.25;
    case "motorway": // Drogi ekspresowe, autostrady
    case "trunk":
      return 3.5;
    default:
      return 3.0; // Domyślna wartość dla innych dróg
  }
};

const getNumberOfLanes = async (lat, lon) => {
  const overpassUrl = "http://overpass-api.de/api/interpreter";

  const query = `
    [out:json];
    way(around:50, ${lat}, ${lon})["highway"]["lanes"];
    out body;
    `;

  try {
    const response = await api.post(overpassUrl, query, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    const data = response.data.elements;
    if (data.length > 0) {
      const tags = data[0].tags;
      const laneWidth = getLaneWidth(tags.highway || "default");
      return { ...tags, laneWidth };
    } else {
      return {
        maxspeed: 50,
        highway: "default",
        lanes: 1,
        surface: "asphalt",
        name: "Nieznana",
      };
    }
  } catch (err) {
    console.error(err);
    return 1;
  }
};

export const calculateLoadIndicator = (el, cVeh, type) => {
  // Dane dotyczące pasażerów
  const totalBusPerDay = 1239232;
  const totalTramPerDay = 681929;
  const totalPassengersPerDay = totalBusPerDay + totalTramPerDay;

  const percentageOfTram = totalTramPerDay / totalPassengersPerDay;
  const percentageOfBus = totalBusPerDay / totalPassengersPerDay;

  const population = el.population_density * el.area;
  const avg_population = population * 0.65; // 65% populacji korzysta z transportu publicznego

  let avg_population_for_tram = avg_population * percentageOfTram;
  let avg_population_for_bus = avg_population * percentageOfBus;

  avg_population_for_bus = Math.round(avg_population_for_bus);
  avg_population_for_tram = Math.round(avg_population_for_tram);

  const operationHours = 18;
  let popBusHour = Math.round(avg_population_for_bus / operationHours);
  let popTramHour = Math.round(avg_population_for_tram / operationHours);

  // Pobieranie aktualnego współczynnika zatłoczenia
  const crowdingFactor = getCrowdingFactor();

  // Obliczanie liczby pasażerów uwzględniając współczynnik zatłoczenia
  const adjustedBusPassengers = popBusHour * crowdingFactor;
  const adjustedTramPassengers = popTramHour * crowdingFactor;

  // Obliczanie współczynnika zatłoczenia dla autobusów i tramwajów
  let loadIndicator = 0;

  if (type == "Autobus") {
    loadIndicator = (adjustedBusPassengers / cVeh) * 100;
    return {
      loadIndicator,
      adjustedPassengers: adjustedBusPassengers,
      avgPopulation: avg_population_for_bus,
    };
  } else {
    loadIndicator = (adjustedTramPassengers / cVeh) * 100;
    return {
      loadIndicator,
      adjustedPassengers: adjustedTramPassengers,
      avgPopulation: avg_population_for_tram,
    };
  }
};

export const getCrowdingFactor = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 9) {
    return 1.2;
  } else if (hour >= 9 && hour < 15) {
    return 0.8;
  } else if (hour >= 15 && hour < 18) {
    return 1.5;
  } else if (hour >= 18 && hour < 21) {
    return 1.0;
  } else {
    return 0.5;
  }
};

const getCoords = async (type, string, districts) => {
  let url = "";

  if (type != "Pieszo") {
    url = "/route/v1/driving/" + string + "?overview=full&geometries=geojson";
  } else {
    url = "/route/v1/walk/" + string + "?overview=full&geometries=geojson";
  }

  const strSplit = string.split(";");

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
      r.data.routes.length > 0 &&
      r.data.routes[0].geometry &&
      r.data.routes[0].geometry.coordinates
    ) {
      const latLngs = r.data.routes[0].geometry.coordinates;
      let previousTags = null;

      const ready = await Promise.all(
        latLngs.map(async (coord, index) => {
          const point = { latitude: coord[1], longitude: coord[0] };
          let districtInfo = {
            name: "Poza Warszawą",
            population_density: 400,
            area: 3,
          };

          for (const district of districts) {
            if (isPointInPolygon(point, district.border_coords)) {
              districtInfo = {
                name: district.name,
                population_density: district.population_density,
                area: district.area,
              };
              break;
            }
          }

          if (index % 10 === 0 || index === latLngs.length - 1) {
            const tags = await getNumberOfLanes(
              point.latitude,
              point.longitude
            );
            // const tags = null;
            previousTags = tags; // Przechowujemy tagi, aby użyć w kolejnych krokach
          }

          return {
            latitude: point.latitude,
            longitude: point.longitude,
            order: index,
            name: districtInfo.name,
            population_density: districtInfo.population_density,
            area: districtInfo.area,
            tags: previousTags, // Używamy obecnych lub ostatnich pobranych tagów
          };
        })
      );

      // Sprawdzamy, czy ostatnie elementy mają przypisane tagi
      for (
        let i = latLngs.length - (latLngs.length % 10);
        i < latLngs.length;
        i++
      ) {
        if (!ready[i].tags) {
          ready[i].tags = previousTags;
        }
      }

      const other_info = r.data.routes[0].legs.map((el, index) => {
        const coords = strSplit[index].split(",");

        const point = { latitude: coords[1], longitude: coords[0] };
        let districtInfo = {
          name: "Poza Warszawą",
          population_density: 400,
          area: 3,
        };

        for (const district of districts) {
          if (isPointInPolygon(point, district.border_coords)) {
            districtInfo = {
              name: district.name,
              population_density: district.population_density,
              area: district.area,
            };
            break;
          }
        }

        return {
          order: index,
          distance: el.distance,
          duration: el.duration,
          weight: el.weight,
          ...districtInfo,
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
      return null;
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
