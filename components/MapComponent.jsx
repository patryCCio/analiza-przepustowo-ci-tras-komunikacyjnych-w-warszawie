import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Cards from "./cards/Cards";
import { MapContext } from "../context/MapContext";
import Markers from "./map/Markers";
import Traces from "./map/Traces";
import CurrentLocation from "./map/CurrentLocation";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setOtherLocation } from "../context/redux/reducers/locationSlice";
import Borders from "./map/Borders";
import ZTM from "./cards/ZTM";
import ZTMTraces from "./ZTMTraces";

const MapComponent = () => {
  const { getLocation, mapRef, region, setRegion } = useContext(MapContext);
  const { location, followGPS, isLocationActive, isRouted } = useSelector(
    (state) => state.root.location
  );
  const { isRouteZTMMap } = useSelector((state) => state.root.layers);

  const [isSearch, setIsSearch] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  const { getRoutesNewData } = useContext(MapContext);
  const [infoMessage, setInfoMessage] = useState(null);
  const [routesInfo, setRoutesInfo] = useState([]);

  const intervalRefMain = useRef(null);

  const dispatch = useDispatch();

  const fitToCoordsHigherSpeed = (data) => {
    let speed = parseFloat(location.coords.speed);
    if (!location) return;

    if (speed < 5) {
      const coords = [
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: data.latitude + 0.00003,
          longitude: data.longitude - 0.0003,
        },
        {
          latitude: data.latitude - 0.0003,
          longitude: data.longitude - 0.0003,
        },
        {
          latitude: data.latitude + 0.0003,
          longitude: data.longitude + 0.0003,
        },
        {
          latitude: data.latitude - 0.0003,
          longitude: data.longitude + 0.0003,
        },
      ];
      mapRef.current.fitToCoordinates(coords);
    } else if (speed >= 5 && speed < 60) {
      const coords = [
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: data.latitude + 0.00005,
          longitude: data.longitude - 0.0005,
        },
        {
          latitude: data.latitude - 0.0005,
          longitude: data.longitude - 0.0005,
        },
        {
          latitude: data.latitude + 0.0005,
          longitude: data.longitude + 0.0005,
        },
        {
          latitude: data.latitude - 0.0005,
          longitude: data.longitude + 0.0005,
        },
      ];
      mapRef.current.fitToCoordinates(coords);
    } else if (speed >= 60 && speed < 120) {
      const coords = [
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: data.latitude + 0.0015,
          longitude: data.longitude - 0.0015,
        },
        {
          latitude: data.latitude - 0.0015,
          longitude: data.longitude - 0.0015,
        },
        {
          latitude: data.latitude + 0.0015,
          longitude: data.longitude + 0.0015,
        },
        {
          latitude: data.latitude - 0.0015,
          longitude: data.longitude + 0.0015,
        },
      ];
      mapRef.current.fitToCoordinates(coords);
    } else {
      const coords = [
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: data.latitude + 0.0025,
          longitude: data.longitude - 0.0025,
        },
        {
          latitude: data.latitude - 0.0025,
          longitude: data.longitude - 0.0025,
        },
        {
          latitude: data.latitude + 0.0025,
          longitude: data.longitude + 0.0025,
        },
        {
          latitude: data.latitude - 0.0025,
          longitude: data.longitude + 0.0025,
        },
      ];
      mapRef.current.fitToCoordinates(coords);
    }
  };

  useEffect(() => {
    if (location) {
      if (followGPS) {
        fitToCoordsHigherSpeed({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    }
  }, [location]);

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
        console.log(count);

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

  const stopIntervalMain = () => {
    if (isLocationActive) {
      dispatch(setOtherLocation({ data: false, choice: "locationActive" }));
      dispatch(setOtherLocation({ choice: "location", data: null }));
      dispatch(setOtherLocation({ data: false, choice: "follow" }));
      clearInterval(intervalRefMain.current);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(e) => {
          setRegion(e);
        }}
        rotateEnabled={false}
        provider={PROVIDER_GOOGLE}
      >
        {location && <CurrentLocation />}
        <Markers
          setIsInfo={setIsInfo}
          setIsSettings={setIsSettings}
          setInfoMessage={setInfoMessage}
          setRoutesInfo={setRoutesInfo}
        />
        <Borders />
        <Traces />

        {isRouteZTMMap && <ZTMTraces />}
      </MapView>

      <ZTM />

      <Cards
        isSearch={isSearch}
        isSettings={isSettings}
        isInfo={isInfo}
        setIsSearch={setIsSearch}
        setIsInfo={setIsInfo}
        setIsSettings={setIsSettings}
        infoMessage={infoMessage}
        setInfoMessage={setInfoMessage}
        stopIntervalMain={stopIntervalMain}
        startIntervalMain={startIntervalMain}
        routesInfo={routesInfo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
