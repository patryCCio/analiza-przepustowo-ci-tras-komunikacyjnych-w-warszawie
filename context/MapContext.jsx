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

  const getRoutesNewData = (dispatch, coords) => {
    let coordsStr = "";

    coords.forEach((el, index) => {
      if (index == coords.length - 1) {
        coordsStr += el.longitude + "," + el.latitude;
      } else {
        coordsStr += el.longitude + "," + el.latitude + ";";
      }
    });

    let string =
      process.env.EXPO_PUBLIC_API_OSRM +
      `${coordsStr}?overview=full&geometries=geojson&steps=true`;

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
        getLocation,
        getRoutesNewData,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
