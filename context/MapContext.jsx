import { createContext, useRef, useState } from "react";
import { setInfoMessage, setOtherLayers } from "./redux/reducers/layersSlice";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";

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

  const fitToCoordsHigherSpeed = (data, speed) => {
    if (speed < 5) {
      mapRef.current.fitToCoordinates({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    } else if (speed >= 5 && speed < 40) {
      const coords = [
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: data.latitude + 0.001,
          longitude: data.longitude - 0.001,
        },
        {
          latitude: data.latitude - 0.001,
          longitude: data.longitude - 0.001,
        },
        {
          latitude: data.latitude + 0.001,
          longitude: data.longitude + 0.001,
        },
        {
          latitude: data.latitude - 0.001,
          longitude: data.longitude + 0.001,
        },
      ];
      mapRef.current.fitToCoordinates(coords);
    } else if (speed >= 40 && speed < 100) {
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
    }
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
        fitToCoordsHigherSpeed,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
