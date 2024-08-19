import { useDispatch, useSelector } from "react-redux";
import MapComponent from "../../components/MapComponent";
import { useEffect, useState } from "react";
import api from "../../api/api";
import Loading from "../../components/Loading";
import { setVehicles, setStops } from "../../context/redux/reducers/mainSlice";

const home = () => {
  const { vehicles, stops } = useSelector((state) => state.root.data);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      if (vehicles.length == 0) {
        const result = await api.get("vehicles/all");
        dispatch(setVehicles(result.data));
      }

      if (stops.length == 0) {
        const result = await api.get("stops/all");
        dispatch(setStops(result.data));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? <Loading /> : <MapComponent />;
};

export default home;
