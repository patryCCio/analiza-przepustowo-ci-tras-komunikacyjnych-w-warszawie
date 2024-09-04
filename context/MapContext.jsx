import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import api from "../api/api";
import { setRoutes } from "./redux/reducers/routesSlice";
import { setOtherLocation } from "./redux/reducers/locationSlice";
import { setCards } from "./redux/reducers/cardsSlice";

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [changeVehicles, setChangeVehicles] = useState(false);
  const [actualOrderTime, setActualOrderTime] = useState(0);
  const [showAccidents, setShowAccidents] = useState(false);

  const dispatch = useDispatch();

  const { vehicles, vehiclesSegments } = useSelector(
    (state) => state.root.data
  );
  const { routeFlow } = useSelector((state) => state.root.settings);

  const intervalRefMain = useRef(null);
  const { isLocationActive } = useSelector((state) => state.root.location);

  const [loadingFlow, setLoadingFlow] = useState(false);
  const [loadingNormal, setLoadingNormal] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const [textDialog, setTextDialog] = useState("");

  const [shortestPath, setShortestPath] = useState([]);
  const [shortestPathArray, setShortestPathArray] = useState([]);
  const [actualShortest, setActualShortest] = useState(0);

  const [analizeEl, setAnalizeEl] = useState(null);

  const startIntervalMain = async () => {
    if (!isLocationActive) {
      let dd = await getLocation();

      if (!dd) return;

      dispatch(setOtherLocation({ choice: "location", data: dd }));
      dispatch(setOtherLocation({ data: true, choice: "locationActive" }));
      let count = 0;

      intervalRefMain.current = setInterval(async () => {
        let dd = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        dispatch(setOtherLocation({ choice: "location", data: dd }));
        count++;

        if (count >= 10) {
          count = 0;
          if (isRouted) {
            const coords = [
              { latitude: dd.coords.latitude, longitude: dd.coords.longitude },
              { latitude: location.endLocation },
            ];
          }
          // getRoutesNewData()
        }
      }, 10000);
    }
  };

  const hideAll = () => {
    dispatch(setCards({ choice: "all", data: false }));
  };

  const stopIntervalMain = () => {
    if (isLocationActive) {
      dispatch(setOtherLocation({ data: false, choice: "locationActive" }));
      dispatch(setOtherLocation({ choice: "location", data: null }));
      dispatch(setOtherLocation({ data: false, choice: "follow" }));
      clearInterval(intervalRefMain.current);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return null;
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

  const [stopInfo, setStopInfo] = useState(null);
  const [traceInfo, setTraceInfo] = useState(null);
  const [routesInfo, setRoutesInfo] = useState([]);

  const [walk, setWalk] = useState(false);
  const [walkCoords, setWalkCoords] = useState({
    fromLat: 0,
    fromLon: 0,
    toLat: 0,
    toLon: 0,
  });

  const [traceData, setTraceData] = useState(null);

  const [showShortestTrace, setShowShortestTrace] = useState(false);
  const [showShortestMarker, setShowShortestMarker] = useState(false);

  useEffect(() => {
    if (vehicles.length > 0 && traceInfo != null) {
      if (vehiclesSegments.length > 0 && routeFlow) {
        vehicles.forEach((el) => {
          if (el.id == traceInfo.vehicle_id) {
            vehiclesSegments.forEach((el2) => {
              if (el2.trace_id == traceInfo.trace_id) {
                setTraceData({
                  ...el,
                  traces: {
                    ...el2,
                    coords_0: el2.coords_0,
                    coords_1: el2.coords_1,
                    coords_2: el2.coords_2,
                  },
                });
              }
            });
          }
        });
      }

      if (!routeFlow) {
        vehicles.forEach((el) => {
          if (el.id == traceInfo.vehicle_id) {
            if (el.traces) {
              el.traces.forEach((el2) => {
                if (el2.id == traceInfo.trace_id) {
                  setTraceData({
                    ...el,
                    traces: {
                      ...el2,
                    },
                  });
                }
              });
            }
          }
        });
      }
    }
  }, [vehicles, traceInfo, vehiclesSegments, routeFlow]);

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
        stopInfo,
        setStopInfo,
        traceInfo,
        setTraceInfo,
        startIntervalMain,
        stopIntervalMain,
        hideAll,
        setRoutesInfo,
        routesInfo,
        traceData,
        changeVehicles,
        setChangeVehicles,
        actualOrderTime,
        setActualOrderTime,
        showAccidents,
        setShowAccidents,
        loadingNormal,
        loadingFlow,
        setLoadingNormal,
        setLoadingFlow,
        showDialog,
        setShowDialog,
        setTextDialog,
        textDialog,
        setTitleDialog,
        titleDialog,
        shortestPath,
        setShortestPath,
        showShortestTrace,
        showShortestMarker,
        setShowShortestTrace,
        setShowShortestMarker,
        setWalk,
        walk,
        walkCoords,
        setWalkCoords,
        setActualShortest,
        actualShortest,
        shortestPathArray,
        setShortestPathArray,
        analizeEl,
        setAnalizeEl,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
