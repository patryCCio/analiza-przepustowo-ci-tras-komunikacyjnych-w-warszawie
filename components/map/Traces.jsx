import { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import { Colors } from "../../constants/Colors";

const Traces = () => {
  const { routes, startLocation, endLocation } = useSelector(
    (state) => state.root.routes
  );

  return (
    <>
      {startLocation && endLocation && routes && (
        <>
          <Marker pinColor={Colors.THIRD} description="Obecna lokalizacja" coordinate={startLocation} title="Początek" />
          <Marker pinColor={Colors.THIRD} description="coś" coordinate={endLocation} title="Koniec" />
          {routes && routes.length > 0 && (
            <Polyline
              coordinates={routes.map((c) => {
                const long = parseFloat(c[0]);
                const lat = parseFloat(c[1]);
                return { longitude: long, latitude: lat };
              })}
              strokeColor={Colors.SECOND}
              strokeColors={[Colors.SECOND]}
              strokeWidth={2}
            />
          )}
        </>
      )}
    </>
  );
};

export default Traces;
