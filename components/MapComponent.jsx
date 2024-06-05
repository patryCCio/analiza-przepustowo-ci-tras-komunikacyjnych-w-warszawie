import { useContext, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile } from "react-native-maps";
import Cards from "./cards/Cards";
import { MapContext } from "../context/MapContext";
import Markers from "./map/Markers";
import Traces from "./map/Traces";
import CurrentLocation from "./map/CurrentLocation";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setOtherLocation } from "../context/redux/reducers/locationSlice";
import Borders from "./map/Borders";
import { setOtherRoutes } from "../context/redux/reducers/routesSlice";

const MapComponent = () => {
  const {
    getLocation,
    mapRef,
    region,
    setRegion,
    fitToCoordsHigher,
    fitToCoordsHigherSpeed,
  } = useContext(MapContext);

  const { location, wantToShareLocation, followGPS, isLocationActive } =
    useSelector((state) => state.root.location);

  const intervalRef = useRef(null);
  const intervalRefMain = useRef(null);

  const { isRide } = useSelector((state) => state.root.routes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location && followGPS) {
      if (isRide) {
        return;
      } else {
        fitToCoordsHigher({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    }
  }, [location]);


  const startIntervalMain = async () => {
    if (!isLocationActive) {
      let dd = await getLocation();
      console.log(dd);
      
      dispatch(setOtherLocation({ choice: "location", data: dd }));
      dispatch(setOtherLocation({ data: true, choice: "locationActive" }));

      intervalRefMain.current = setInterval(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let dd = await Location.getCurrentPositionAsync({});
        dispatch(setOtherLocation({ choice: "location", data: dd }));
      }, 1000);
    }
  };

  const stopIntervalMain = () => {
    if (isLocationActive) {
      dispatch(setOtherLocation({ data: false, choice: "locationActive" }));
      clearInterval(intervalRefMain.current);
    }
  };

  let speedo = 0;

  const startInterval = () => {
    if (!isRide) {
      dispatch(setOtherRoutes({ data: true, choice: "ride" }));
      intervalRef.current = setInterval(() => {
        speedo += 5;
        fitToCoordsHigherSpeed(
          {
            latitude: parseFloat(location.coords.latitude),
            longitude: parseFloat(location.coords.longitude),
          },
          speedo
        );
        console.log("Ok!");
        console.log(location);
      }, 5000);
    }
  };

  const stopInterval = () => {
    if (isRide) {
      dispatch(setOtherRoutes({ data: false, choice: "ride" }));
      clearInterval(intervalRef.current);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        followsUserLocation={followGPS}
        onRegionChangeComplete={(e) => {
          setRegion(e);
        }}
        rotateEnabled={false}
      >
        <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {location && wantToShareLocation && <CurrentLocation />}
        <Markers />
        <Borders />
        <Traces />
      </MapView>
      <Cards
        startIntervalMain={startIntervalMain}
        startInterval={startInterval}
        stopInterval={stopInterval}
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
