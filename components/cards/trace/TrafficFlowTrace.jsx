import { useEffect, useContext } from "react";
import { Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  getColorBySpeed,
  isCoordinateInRegion,
} from "../../../context/redux/functions";
import { MapContext } from "../../../context/MapContext";
import api from "../../../api/api";
import { setCards } from "../../../context/redux/reducers/cardsSlice";
import {
  setAccidents,
  setAnomalies,
  setPartials,
  setVehiclesSegments,
} from "../../../context/redux/reducers/mainSlice";

const TrafficFlowTrace = () => {
  const { vehicles, vehiclesSegments } = useSelector(
    (state) => state.root.data
  );
  const {
    setTraceInfo,
    setChangeVehicles,
    changeVehicles,
    region,
    actualOrderTime,
    setLoadingFlow,
  } = useContext(MapContext);

  const dispatch = useDispatch();

  const setData = async () => {
    try {
      setLoadingFlow(true);
      const newVehicle = await api.post("operations/get-flow-for-traces", {
        vehicles: vehicles,
      });

      dispatch(setVehiclesSegments(newVehicle.data.vehicles));
      dispatch(setAnomalies(newVehicle.data.anomalies));
      dispatch(setAccidents(newVehicle.data.accidents));
      dispatch(setPartials(newVehicle.data.partials));
      setChangeVehicles(false);
      setLoadingFlow(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePress = (vehicle_id, trace_id) => {
    setTraceInfo({ vehicle_id, trace_id });
    dispatch(setCards({ choice: "all", data: false }));
    dispatch(setCards({ choice: "ztmCardInfo", data: true }));
  };

  useEffect(() => {
    if (changeVehicles && vehicles.length > 0) {
      setData();
    }
  }, [vehicles, changeVehicles]);

  return (
    <>
      {vehiclesSegments.length > 0 &&
        vehiclesSegments.map((el) => {
          if (actualOrderTime == 0) {
            return el.coords_0.coordinates.map((coord, index) => {
              if (index < el.coords.coordinates.length - 1) {
                const startCoord = coord;
                const endCoord = el.coords.coordinates[index + 1];
                const color = getColorBySpeed(startCoord.speed);

                if (
                  region &&
                  (isCoordinateInRegion(startCoord, region) ||
                    isCoordinateInRegion(endCoord, region))
                ) {
                  return (
                    <Polyline
                      strokeWidth={2}
                      strokeColor={color}
                      coordinates={[startCoord, endCoord]}
                      key={`${el.route}-${el.stop_from}-${index}`}
                      tappable={true}
                      onPress={() => handlePress(el.vehicle_id, el.trace_id)}
                    />
                  );
                }
              }
              return null;
            });
          } else if (actualOrderTime == 1) {
            return el.coords_1.coordinates.map((coord, index) => {
              if (index < el.coords.coordinates.length - 1) {
                const startCoord = coord;
                const endCoord = el.coords.coordinates[index + 1];
                const color = getColorBySpeed(startCoord.speed);

                if (
                  region &&
                  (isCoordinateInRegion(startCoord, region) ||
                    isCoordinateInRegion(endCoord, region))
                ) {
                  return (
                    <Polyline
                      strokeWidth={2}
                      strokeColor={color}
                      coordinates={[startCoord, endCoord]}
                      key={`${el.route}-${el.stop_from}-${index}`}
                      tappable={true}
                      onPress={() => handlePress(el.vehicle_id, el.trace_id)}
                    />
                  );
                }
              }
              return null;
            });
          } else if (actualOrderTime == 2) {
            return el.coords_2.coordinates.map((coord, index) => {
              if (index < el.coords.coordinates.length - 1) {
                const startCoord = coord;
                const endCoord = el.coords.coordinates[index + 1];
                const color = getColorBySpeed(startCoord.speed);

                if (
                  region &&
                  (isCoordinateInRegion(startCoord, region) ||
                    isCoordinateInRegion(endCoord, region))
                ) {
                  return (
                    <Polyline
                      strokeWidth={2}
                      strokeColor={color}
                      coordinates={[startCoord, endCoord]}
                      key={`${el.route}-${el.stop_from}-${index}`}
                      tappable={true}
                      onPress={() => handlePress(el.vehicle_id, el.trace_id)}
                    />
                  );
                }
              }
              return null;
            });
          }
        })}
    </>
  );
};

export default TrafficFlowTrace;
