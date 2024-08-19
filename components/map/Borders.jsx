import { useContext, useEffect } from "react";
import api from "../../api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setDistricts } from "../../context/redux/reducers/mainSlice.js";
import { Marker, Polygon } from "react-native-maps";
import { Text, View } from "react-native";
import { MapContext } from "../../context/MapContext.jsx";

const Borders = () => {
  const { districts } = useSelector((state) => state.root.data);
  const { isDistrictMap } = useSelector((state) => state.root.settings);

  const { region } = useContext(MapContext);

  const dispatch = useDispatch();

  let indexx = -1;

  useEffect(() => {
    if (districts.length > 0) {
    }
  }, [districts]);

  const getBorders = async () => {
    if (!isDistrictMap) return;
    if (districts.length != 0) return;
    try {
      const result = await api.get("districts/districts-info");

      dispatch(setDistricts(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBorders();
  }, [isDistrictMap]);

  const isCoordinateInRegion = (latitude, longitude, region) => {
    const latInRange =
      latitude >= region.latitude - region.latitudeDelta / 2 &&
      latitude <= region.latitude + region.latitudeDelta / 2;
    const lonInRange =
      longitude >= region.longitude - region.longitudeDelta / 2 &&
      longitude <= region.longitude + region.longitudeDelta / 2;
    return latInRange && lonInRange;
  };

  return (
    <>
      {districts
        .filter((el) =>
          el.border_coords.some((coord) =>
            isCoordinateInRegion(coord.latitude, coord.longitude, region)
          )
        )
        .map((el) => {
          indexx++;
          return (
            <Polygon
              key={indexx}
              fillColor="rgba(127, 87, 242, 0.08)"
              style={{ opacity: 0.3 }}
              strokeColor="royalblue"
              coordinates={el.border_coords}
            />
          );
        })}

      {districts
        .filter((el) =>
          isCoordinateInRegion(el.pin_latitude, el.pin_longitude, region)
        )
        .map((el) => {
          indexx++;
          return (
            <Marker
              key={indexx}
              coordinate={{
                latitude: el.pin_latitude,
                longitude: el.pin_longitude,
              }}
            >
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                    fontSize: 16,
                    color: "#7F57F2",
                    fontFamily: "outfit-medium",
                    textAlign: "center",
                  }}
                >
                  {el.name}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "outfit",
                    fontSize: 14,
                    textAlign: "center",
                    paddingHorizontal: 8,
                    marginBottom: 3,
                  }}
                >
                  {el.population_density + " os/km2"}
                </Text>
              </View>
            </Marker>
          );
        })}
    </>
  );
};

export default Borders;
