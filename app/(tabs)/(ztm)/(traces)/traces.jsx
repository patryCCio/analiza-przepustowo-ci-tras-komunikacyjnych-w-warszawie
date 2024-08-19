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
import { getTraces } from "../../../../context/redux/functions";
import { Colors } from "../../../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "../../../../components/Loading";

const traces = () => {
  const { id } = useGlobalSearchParams();
  const navigation = useNavigation();

  const { vehicles } = useSelector((state) => state.root.data);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const getData = async () => {
    getTraces(dispatch, vehicle);
  };

  useEffect(() => {
    if (vehicle) {
      const parent = navigation.getParent();
      parent.setOptions({ headerShown: false });
      navigation.setOptions({
        title: vehicle.type + ": " + vehicle.route,
        headerShown: true,
      });
      if (!vehicle.traces) {
        getData();
      } else {
        setLoading(false);
      }
    }
  }, [vehicle]);

  useEffect(() => {
    if (vehicles.length > 0 && id) {
      vehicles.forEach((el) => {
        if (el.id == id) {
          setVehicle(el);
        }
      });
    }
  }, [vehicles, id]);

  return loading ? (
    <Loading />
  ) : (
    <ScrollView style={styles.card}>
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
        Trasy
      </Text>

      <View
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        {vehicle && vehicle.traces && vehicle.traces.length > 0 ? (
          vehicle.traces.map((trace) => {
            return (
              <TouchableOpacity
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: Colors.PRIMARY,
                  padding: 10,
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "white",
                }}
                onPress={() =>
                  router.push(
                    "/routes/?vehicle_id=" + id + "&trace_id=" + trace.id
                  )
                }
                key={trace.id}
              >
                <View
                  style={{ flex: 1, alignItems: "flex-start", width: "100%" }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit-medium",
                      fontSize: 16,
                      color: "black",
                    }}
                  >
                    {trace.stop_from}
                  </Text>
                </View>
                <FontAwesome
                  name="long-arrow-right"
                  size={64}
                  color={Colors.PRIMARY}
                  style={{
                    marginVertical: 20,
                    transform: [{ rotate: "25deg" }],
                  }}
                />
                <View
                  style={{ flex: 1, alignItems: "flex-end", width: "100%" }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit-medium",
                      fontSize: 16,
                      color: "black",
                    }}
                  >
                    {trace.stop_end}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Brak tras!</Text>
        )}
      </View>
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

export default traces;
