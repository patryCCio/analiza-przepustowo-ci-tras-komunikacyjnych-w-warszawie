import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../../../../../constants/Colors";
import Loading from "../../../../../../components/Loading";
import Ionicons from "@expo/vector-icons/Ionicons";

const timetables = () => {
  const { stops, vehicles } = useSelector((state) => state.root.data);
  const { trace_id, stop_id, route_id, vehicle_id, other_route } =
    useGlobalSearchParams();

  const [timetable, setTimetable] = useState([]);

  const [loading, setLoading] = useState(true);

  const [vehicle, setVehicle] = useState(null);

  const [splited, setSplited] = useState([]);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    if (timetable.length > 0) {
      const arr = [];

      timetable.forEach((el) => {
        const timeToAdd = el.time.split(":")[0];
        let isTime = false;

        arr.forEach((el2) => {
          if (el2 == timeToAdd) isTime = true;
        });

        if (!isTime) {
          arr.push(timeToAdd);
        }
      });
      setSplited(arr);

      setLoading(false);
    }
  }, [timetable]);

  useEffect(() => {
    if (vehicle) {
      const parent = navigation.getParent();

      let string = "";

      stops.forEach((el) => {
        if (el.id == stop_id) {
          string = el.name + " " + el.number_of_stop;
        }
      });

      navigation.setOptions({
        title: vehicle.route + " | " + string,
      });
      parent.setOptions({ headerShown: false });
      vehicle.traces.forEach((el) => {
        if (el.id == trace_id) {
          el.routes.forEach((el2) => {
            if (el2.stop_id == stop_id) {
              setTimetable(el2.timetables);
            }
          });
        }
      });
    }
  }, [vehicle]);

  useEffect(() => {
    if (
      stops.length > 0 &&
      vehicles.length > 0 &&
      trace_id &&
      stop_id &&
      route_id &&
      vehicle_id
    ) {
      vehicles.forEach((el) => {
        if (el.id == vehicle_id) {
          setVehicle(el);
        }
      });
    }
  }, [stops, vehicles, vehicle_id, trace_id, stop_id, route_id, other_route]);

  return loading ? (
    <Loading />
  ) : (
    <ScrollView style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {other_route == "true" && (
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.PRIMARY}
            onPress={() => router.push("/ztm")}
          />
        )}
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: Colors.PRIMARY,
            fontSize: 36,
            flex: 1,
            textAlign: "center",
            paddingVertical: 20,
          }}
        >
          Rozkład jazdy
        </Text>
      </View>
      {splited.length > 0 && (
        <View style={{ gap: 25 }}>
          {splited.map((el, index) => {
            return (
              <View
                style={{ flexDirection: "row", gap: 40, paddingBottom: 20 }}
                key={index}
              >
                <View
                  style={{
                    borderBottomColor: Colors.PRIMARY,
                    borderBottomWidth: 2,
                    padding: 15,
                    width: 60,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit-medium",
                      color: Colors.PRIMARY,
                      fontSize: 24,
                    }}
                  >
                    {el}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    width: 60,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexWrap: "wrap",
                    flex: 1,
                  }}
                >
                  {timetable.map((el2, index2) => {
                    if (el2.time.split(":")[0] == el) {
                      return (
                        <Text
                          key={index2}
                          style={{
                            fontSize: 18,
                          }}
                        >
                          {el2.time.split(":")[1]}
                        </Text>
                      );
                    }
                  })}
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 200,
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
});

export default timetables;
