import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { Marker } from "react-native-maps";
import { Colors } from "../../constants/Colors";

const Markers = () => {
  const {
    fitToCoordsHigher,
    region,
    stops,
    setIsVisibleInfo,
    setIsVisibleSettings,
    setInfoMessage,
    showStops,
  } = useContext(MapContext);
  const [visibleMarkers, setVisibleMarkers] = useState([]);

  const filteredMarkers = () => {
    if (showStops) {
      let zoomLevel =
        Math.log2(360 / Math.max(region.latitudeDelta, region.longitudeDelta)) +
        1;

      let latitudeMin = 0;
      let latitudeMax = 0;
      let longitudeMin = 0;
      let longitudeMax = 0;

      if (zoomLevel >= 17) {
        latitudeMin = region.latitude - region.latitudeDelta / 2;
        latitudeMax = region.latitude + region.latitudeDelta / 2;
        longitudeMin = region.longitude - region.longitudeDelta / 2;
        longitudeMax = region.longitude + region.longitudeDelta / 2;
      } else if (zoomLevel < 17 && zoomLevel >= 15) {
        latitudeMin = region.latitude - region.latitudeDelta / 2.5;
        latitudeMax = region.latitude + region.latitudeDelta / 2.5;
        longitudeMin = region.longitude - region.longitudeDelta / 2.5;
        longitudeMax = region.longitude + region.longitudeDelta / 2.5;
      } else if (zoomLevel < 15 && zoomLevel >= 12.5) {
        latitudeMin = region.latitude - region.latitudeDelta / 5;
        latitudeMax = region.latitude + region.latitudeDelta / 5;
        longitudeMin = region.longitude - region.longitudeDelta / 3.5;
        longitudeMax = region.longitude + region.longitudeDelta / 3.5;
      }

      const filteredMarkers = stops.filter(
        (marker) =>
          marker.latitude >= latitudeMin &&
          marker.latitude <= latitudeMax &&
          marker.longitude >= longitudeMin &&
          marker.longitude <= longitudeMax
      );

      if (zoomLevel < 12.5) {
        setVisibleMarkers([]);
      } else {
        setVisibleMarkers(filteredMarkers);
      }
    } else {
      setVisibleMarkers([]);
    }
  };

  useEffect(() => {
    filteredMarkers();
  }, [region, showStops]);

  const showInfo = (marker) => {
    setInfoMessage(marker);
    setIsVisibleInfo(true);
    setIsVisibleSettings(false);

    fitToCoordsHigher({
      latitude: marker.latitude,
      longitude: marker.longitude,
    });
  };

  return (
    <>
      {visibleMarkers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={Colors.PRIMARY}
            onPress={() => {
              showInfo(marker);
            }}
          />
        );
      })}
    </>
  );
};

export default Markers;
