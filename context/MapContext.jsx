import { createContext, useRef, useState } from "react";
import { setInfoMessage, setOtherLayers } from "./redux/reducers/layersSlice";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import api from "../api/api";
import { setRoutes } from "./redux/reducers/routesSlice";

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const dispatch = useDispatch();

  const hideAll = () => {
    dispatch(setOtherLayers({ data: false, choice: "search" }));
    dispatch(setOtherLayers({ data: false, choice: "info" }));
    dispatch(setOtherLayers({ data: false, choice: "settings" }));
    dispatch(setOtherLayers({ data: false, choice: "settings" }));
    dispatch(setOtherLayers({ data: false, choice: "route" }));
    dispatch(setInfoMessage(null));
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let dd = await Location.getCurrentPositionAsync({});

    return dd;
  };

  const fitToCoords = (coords) => {
    mapRef.current.fitToCoordinates(coords);
  };

  const fitToCoordsHigher = (data) => {
    const coords = [
      {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      {
        latitude: data.latitude + 0.003,
        longitude: data.longitude - 0.003,
      },
      {
        latitude: data.latitude - 0.003,
        longitude: data.longitude - 0.003,
      },
      {
        latitude: data.latitude + 0.003,
        longitude: data.longitude + 0.003,
      },
      {
        latitude: data.latitude - 0.003,
        longitude: data.longitude + 0.003,
      },
    ];

    mapRef.current.fitToCoordinates(coords);
  };

  const getRoutesNewData = (dispatch, longFrom, latFrom, longTo, latTo) => {
    const string =
      process.env.EXPO_PUBLIC_API_OSRM +
      `${longFrom},${latFrom};${longTo},${latTo}?overview=full&geometries=geojson&steps=true`;

    api.get(string).then((r) => {
      if (
        r.data.routes &&
        r.data.routes &&
        r.data.routes.length > 0 &&
        r.data.routes[0].geometry &&
        r.data.routes[0].geometry.coordinates
      ) {
        dispatch(setRoutes(r.data.routes[0].geometry.coordinates));
      }
    });
  };

  return (
    <MapContext.Provider
      value={{
        mapRef,
        setRegion,
        region,
        fitToCoordsHigher,
        fitToCoords,
        hideAll,
        getLocation,
        getRoutesNewData,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
