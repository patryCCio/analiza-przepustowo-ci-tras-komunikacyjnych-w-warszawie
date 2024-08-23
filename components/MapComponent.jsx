import { useCallback, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Cards from "./cards/Cards";
import { MapContext } from "../context/MapContext";
import Markers from "./map/Markers";
import CurrentLocation from "./map/CurrentLocation";
import { useSelector } from "react-redux";
import Borders from "./map/Borders";
import ZTMTraces from "./cards/trace/ZTMTraces";
import ColorsInfo from "./cards/ColorsInfo";
import { debounce } from "lodash";
import Buttons from "./buttons/Buttons";
import TrafficFlowTrace from "./cards/trace/TrafficFlowTrace";
import DistrictTrace from "./cards/trace/DistrictTrace";

const MapComponent = () => {
  const { mapRef, region, setRegion } = useContext(MapContext);
  const { location, followGPS } = useSelector((state) => state.root.location);
  const {
    isRouteZTMMap,
    routeNormal,
    routeFlow,
    routeDistrict,
    isDistrictMap,
    isStopsMap,
  } = useSelector((state) => state.root.settings);

  const { colorsButton } = useSelector((state) => state.root.buttons);

  const debouncedRegionChange = useCallback(
    debounce((newRegion, setRegion) => {
      setRegion(newRegion);
    }, 300),
    []
  );

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

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) =>
          debouncedRegionChange(newRegion, setRegion)
        }
        rotateEnabled={false}
        provider={PROVIDER_GOOGLE}
      >
        {location && <CurrentLocation />}

        {isStopsMap && <Markers />}
        {isDistrictMap && <Borders />}
        {routeNormal && <ZTMTraces />}
        {routeFlow && <TrafficFlowTrace />}
        {routeDistrict && <DistrictTrace />}
      </MapView>

      {isRouteZTMMap && !colorsButton && <ColorsInfo />}

      <Buttons />
      <Cards />
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
