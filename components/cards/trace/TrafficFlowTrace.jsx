import { useEffect, useState, useContext } from "react";
import { Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import {
  getAllActiveVehicles,
  getColorBySpeed,
  getFlowForTraces,
  isCoordinateInRegion,
} from "../../../context/redux/functions";
import { MapContext } from "../../../context/MapContext";

const TrafficFlowTrace = () => {
  const { traffic_flow, vehicles } = useSelector(
    (state) => state.root.data
  );
  const [vehiclesSegments, setVehilcesSegments] = useState([]);

  const { region } = useContext(MapContext);

  const setData = async () => {
    const vehiclesArray = await getAllActiveVehicles(vehicles);
    const newVehicle = await getFlowForTraces(vehiclesArray, traffic_flow, 0);

    setVehilcesSegments(newVehicle);
  };

  useEffect(() => {
    if (vehicles.length > 0 && traffic_flow.length > 0) {
      setData();
    }
  }, [traffic_flow, vehicles]);

  return (
    <>
      {vehiclesSegments.length > 0 &&
        vehiclesSegments.map((el) => {
          return el.coords.coordinates.map((coord, index) => {
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
                  />
                );
              }
            }
            return null;
          });
        })}
    </>
  );
};

export default TrafficFlowTrace;
