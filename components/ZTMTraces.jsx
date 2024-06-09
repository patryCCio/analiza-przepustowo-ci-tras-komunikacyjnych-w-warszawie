import { Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import { Colors } from "../constants/Colors";

const ZTMTraces = () => {
  const { ztm } = useSelector((state) => state.root.data);

  return (
    <>
      {ztm.map((el) => {
        if (el.route1_coords) {
          return (
            <Polyline
              coordinates={el.route1_coords.map((c) => {
                const long = parseFloat(c[0]);
                const lat = parseFloat(c[1]);
                return { longitude: long, latitude: lat };
              })}
              strokeColor={Colors.SECOND}
              strokeColors={[Colors.SECOND]}
              strokeWidth={2}
            />
          );
        }
      })}

      {ztm.map((el) => {
        if (el.route2_coords) {
          return (
            <Polyline
              coordinates={el.route2_coords.map((c) => {
                const long = parseFloat(c[0]);
                const lat = parseFloat(c[1]);
                return { longitude: long, latitude: lat };
              })}
              strokeColor={"purple"}
              strokeColors={["purple"]}
              strokeWidth={2}
            />
          );
        }
      })}
    </>
  );
};

export default ZTMTraces;
