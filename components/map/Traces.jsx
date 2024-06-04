import { useContext } from "react";
import { Marker, Polyline } from "react-native-maps";
import { MapContext } from "../../context/MapContext";

const Traces = () => {
  const { routeCoordinates, startLocation, endLocation } =
    useContext(MapContext);

  return (
    <>
      {startLocation && endLocation && (
        <>
          <Marker coordinate={startLocation} title="Start" />
          <Marker coordinate={endLocation} title="End" />
          {routeCoordinates && routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates.map((c) => {
                const long = parseFloat(c[0]);
                const lat = parseFloat(c[1]);
                return { longitude: long, latitude: lat };
              })}
              strokeColor="red"
              strokeColors={["#7F0000"]}
              strokeWidth={6}
            />
          )}
        </>
      )}
    </>
  );
};

export default Traces;
