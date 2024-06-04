import { useContext, useEffect } from "react";
import MapComponent from "../../components/MapComponent";
import LoadingScreen from "../../components/LoadingScreen";
import api from "../../api/api";
import { MapContext } from "../../context/MapContext";

const home = () => {
  const { stops, setStops } = useContext(MapContext);

  const getStops = async () => {
    if (stops.length != 0) return;
    try {
      const result = await api.get(
        process.env.EXPO_PUBLIC_API_URL + "timetables/timetable-info-all/stops"
      );

      setStops(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStops();
  }, []);

  return stops.length > 0 ? <MapComponent /> : <LoadingScreen />;
};

export default home;
