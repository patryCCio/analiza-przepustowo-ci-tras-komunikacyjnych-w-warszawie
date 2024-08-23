import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../../../../../context/redux/functions";
import { Colors } from "../../../../../constants/Colors";
import Loading from "../../../../../components/Loading";

const routes = () => {
  const { vehicles, stops, districts } = useSelector((state) => state.root.data);
  const [route, setRoute] = useState([]);

  const [loading, setLoading] = useState(true);

  const { vehicle_id, trace_id } = useGlobalSearchParams();
  const navigation = useNavigation();

  const [vehicle, setVehicle] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const getData = async (trace) => {
    getRoutes(dispatch, vehicle, trace, stops, districts);
  };

  useEffect(() => {
    if (route.length > 0) {
      setLoading(false);
    }
  }, [route]);

  useEffect(() => {
    if (vehicle) {
      const array = [];
      const parent = navigation.getParent();
      navigation.setOptions({
        headerShown: true,
        title: vehicle.type + ": " + vehicle.route,
      });
      parent.setOptions({ headerShown: false });
      vehicle.traces.forEach((el) => {
        if (el.id == trace_id) {
          if (!el.routes) {
            getData(el);
          } else {
            el.routes.forEach((el2) => {
              array.push({
                ...el2,
                stop_from: el.stop_from,
                stop_end: el.stop_end,
              });
            });
          }
        }
      });

      if (array.length > 0) {
        const ready = [];
        stops.forEach((el) => {
          array.forEach((el2) => {
            if (el.id == el2.stop_id) {
              ready.push({ ...el, ...el2, id: el2.id });
            }
          });
        });

        setRoute(ready.sort((a, b) => a.order - b.order));
      }
    }
  }, [vehicle]);

  useEffect(() => {
    if (vehicles.length > 0 && vehicle_id && trace_id && stops.length > 0) {
      vehicles.forEach((el) => {
        if (el.id == vehicle_id) {
          setVehicle(el);
        }
      });
    }
  }, [vehicles, stops, vehicle_id, trace_id]);

  return loading ? (
    <Loading />
  ) : (
    <ScrollView
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      }}
    >
      <View style={style.info2}>
        {route.length > 0 && (
          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "outfit-medium",
                color: Colors.PRIMARY,
                fontSize: 14,
                flex: 1,
                textAlign: "center",
                paddingVertical: 20,
              }}
            >
              {route[0].stop_from}
            </Text>
            <Text style={{ fontSize: 22 }}>do</Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                color: Colors.PRIMARY,
                fontSize: 14,
                flex: 1,
                textAlign: "center",
                paddingVertical: 20,
              }}
            >
              {route[0].stop_end}
            </Text>
          </View>
        )}
        <View style={style.stops}>
          {route.length > 0 &&
            route.map((el, index) => {
              return (
                <View
                  style={{
                    paddingLeft: 50,
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        "/timetables/?route_id=" +
                          el.id +
                          "&stop_id=" +
                          el.stop_id +
                          "&trace_id=" +
                          trace_id +
                          "&vehicle_id=" +
                          vehicle_id +
                          "&other_route=false"
                      )
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 25,
                      }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: Colors.PRIMARY,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ color: "white", fontFamily: "outfit-bold" }}
                        >
                          {el.order}
                        </Text>
                      </View>
                      <Text
                        style={{ fontFamily: "outfit-medium", fontSize: 14 }}
                      >
                        {el.name + " " + el.number_of_stop}
                      </Text>
                      {index > 0 && (
                        <Text
                          style={{
                            fontFamily: "outfit",
                            fontSize: 12,
                            position: "absolute",
                            top: -40,
                            left: 50,
                            color: Colors.THIRD
                          }}
                        >
                          {el.timeFromZero + " min"}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  {index != route.length - 1 && (
                    <View
                      style={{
                        width: 2,
                        height: 60,
                        marginLeft: 19,
                        backgroundColor: Colors.SECOND,
                      }}
                    />
                  )}
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  name: {
    fontFamily: "outfit-bold",
    fontSize: 26,
    color: Colors.PRIMARY,
  },
  generalInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  info2: {
    marginBottom: 15,
    gap: 8,
  },
  info2_text_2: {
    fontSize: 16,
    fontFamily: "outfit",
    textAlign: "center",
    marginBottom: 10,
  },
  info2_text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
  from_to: {
    alignItems: "center",
  },

  from_to_text: {
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
  stops: {
    alignItems: "center",
  },
});

export default routes;
