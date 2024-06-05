import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { Marker } from "react-native-maps";
import { Colors } from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import { setStops } from "../../context/redux/reducers/callsSlice";
import {
  setOtherLayers,
  setInfoMessage,
} from "../../context/redux/reducers/layersSlice";

const Markers = () => {
  const { fitToCoordsHigher, region } = useContext(MapContext);
  const [visibleMarkers, setVisibleMarkers] = useState([]);

  const { stops } = useSelector((state) => state.root.data);
  const { isStopsMap } = useSelector((state) => state.root.layers);
  const dispatch = useDispatch();

  const getStops = async () => {
    if (!isStopsMap) return;
    if (stops.length != 0) return;
    try {
      const result = await api.get(
        process.env.EXPO_PUBLIC_API_URL + "timetables/timetable-info-all/stops"
      );

      dispatch(setStops(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStops();
  }, [isStopsMap]);

  const filteredMarkers = () => {
    if (isStopsMap) {
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
  }, [region, isStopsMap]);

  const showInfo = (marker) => {
    dispatch(setInfoMessage(marker));
    dispatch(setOtherLayers({ choice: "info", data: true }));
    dispatch(setOtherLayers({ choice: "settings", data: false }));

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
