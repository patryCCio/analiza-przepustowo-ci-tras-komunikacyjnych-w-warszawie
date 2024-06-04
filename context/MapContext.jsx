import { createContext, useRef, useState } from "react";

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  // cards
  const [isVisibleSearch, setIsVisibleSearch] = useState(false);
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);
  const [isVisibleSettings, setIsVisibleSettings] = useState(false);
  const [isRouted, setIsRouted] = useState(false);
  // ===

  const [infoMessage, setInfoMessage] = useState("");
  const [location, setLocation] = useState(null);
  const [wantToShareLocation, setWantToShareLocation] = useState(false);

  const [followLocation, setFollowLocation] = useState(false);

  // layers
  const [showTrafficFlow, setShowTrafficFlow] = useState(false);
  const [showStops, setShowStops] = useState(false);

  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [stops, setStops] = useState([]);

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  const hideAll = () => {
    setIsVisibleSettings(false);
    setIsVisibleInfo(false);
    setIsVisibleSearch(false);
    setInfoMessage(null);
    setIsRouted(false);
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

  return (
    <MapContext.Provider
      value={{
        isVisibleSearch,
        setIsVisibleSearch,
        stops,
        setStops,
        mapRef,
        region,
        setRegion,
        infoMessage,
        setInfoMessage,
        isVisibleSettings,
        setIsVisibleSettings,
        fitToCoords,
        isVisibleInfo,
        setIsVisibleInfo,
        hideAll,
        showStops,
        setShowStops,
        showTrafficFlow,
        setShowTrafficFlow,

        setEndLocation,
        endLocation,
        startLocation,
        setStartLocation,
        routeCoordinates,
        setRouteCoordinates,

        isRouted,
        setIsRouted,

        wantToShareLocation,
        setWantToShareLocation,
        location,
        setLocation,
        fitToCoordsHigher,
        followLocation,
        setFollowLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
