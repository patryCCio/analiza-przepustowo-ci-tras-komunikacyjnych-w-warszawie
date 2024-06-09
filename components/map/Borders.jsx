import { useEffect } from "react";
import api from "../../api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setDistricts } from "../../context/redux/reducers/callsSlice.js";
import { Marker, Polygon } from "react-native-maps";
import { Text, View } from "react-native";

const Borders = () => {
  const { districts } = useSelector((state) => state.root.data);
  const { isDistrictMap } = useSelector((state) => state.root.layers);

  const dispatch = useDispatch();

  const getBorders = async () => {
    if (!isDistrictMap) return;
    if (districts.length != 0) return;
    try {
      const result = await api.get(
        process.env.EXPO_PUBLIC_API_URL + "districts/districts-info"
      );

      dispatch(setDistricts(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBorders();
  }, [isDistrictMap]);

  return (
    <>
      {isDistrictMap
        ? districts.map((el, index) => {
            if (el.border_coords.length > 0) {
              const array = [];
              el.border_coords.forEach((c) => {
                array.push({
                  latitude: parseFloat(c.latitude),
                  longitude: parseFloat(c.longitude),
                });
              });
              return (
                <>
                  <Polygon
                    key={index}
                    fillColor="rgba(0,0,0,0.2)"
                    style={{ opacity: 0.3 }}
                    coordinates={array}
                  />
                  <Marker
                    key={districts.length + index}
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
                </>
              );
            }
          })
        : null}
    </>
  );
};

export default Borders;
