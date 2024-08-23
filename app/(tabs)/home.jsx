import { useDispatch, useSelector } from "react-redux";
import MapComponent from "../../components/MapComponent";
import { useEffect, useState } from "react";
import api from "../../api/api";
import Loading from "../../components/Loading";
import {
  setVehicles,
  setStops,
  setDistricts,
} from "../../context/redux/reducers/mainSlice";
import axios from "axios";
import { refactorAllTrafficFlowData } from "../../context/redux/functions";

const home = () => {
  const { vehicles, stops, districts } = useSelector(
    (state) => state.root.data
  );

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

      if (districts.length == 0) {
        const result = await api.get("districts/districts-info");
        dispatch(setDistricts(result.data));
      }

      const string = 52.2297 + "," + 21.0122 + ";r=" + 100;

      const url = `https://traffic.ls.hereapi.com/traffic/6.2/flow.json?apiKey=${process.env.EXPO_PUBLIC_API_HERE}&prox=52.2297,21.0122,500&responseattributes=sh,fc,fi&units=metric`;

      const url2 = `https://data.traffic.hereapi.com/v7/flow?in=circle:${string}&locationReferencing=shape&apiKey=${process.env.EXPO_PUBLIC_API_HERE}`;
      const url3 = `https://data.traffic.hereapi.com/v7/flow?in=circle:52.2297,21.0122;r=100&locationReferencing=shape&apiKey=rJxEQpsFwFxAi1O9Y4Ydkbyc--KtGiGu4kS26U28hlA`;
      const array = [
        { dd: "ttt", he: "ff" },
        { lol: "tt", dd: "zz" },
      ];

      // const response = await axios.get(url2);

      // const res = await api.post("json/save-to-json", { data: response.data });
      // console.log(res.data);

      const res = await api.get("json/get-json");
      refactorAllTrafficFlowData(dispatch, res.data);
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
