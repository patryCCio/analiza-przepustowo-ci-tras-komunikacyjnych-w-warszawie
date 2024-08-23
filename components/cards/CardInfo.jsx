import { globalStyles } from "../../constants/Globals";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import { setTracesFromFullData } from "../../context/redux/reducers/mainSlice";
import { useRouter } from "expo-router";
import { getAllData } from "../../context/redux/functions";

const CardInfo = () => {
  const { fitToCoords, routesInfo, stopInfo, hideAll } = useContext(MapContext);
  const { vehicles, districts } = useSelector((state) => state.root.data);
  const dispatch = useDispatch();

  const router = useRouter();

  const backToCoords = () => {
    const coords = [
      { latitude: stopInfo.latitude, longitude: stopInfo.longitude },
      {
        latitude: stopInfo.latitude + 0.003,
        longitude: stopInfo.longitude - 0.003,
      },
      {
        latitude: stopInfo.latitude - 0.003,
        longitude: stopInfo.longitude - 0.003,
      },
      {
        latitude: stopInfo.latitude + 0.003,
        longitude: stopInfo.longitude + 0.003,
      },
      {
        latitude: stopInfo.latitude - 0.003,
        longitude: stopInfo.longitude + 0.003,
      },
    ];
    fitToCoords(coords);
  };

  const handleClickCheck = async (el) => {
    try {
      const result = await api.get("timetables/get-data/" + el.id);

      const vehicle_id = el.id;
      const trace_id = el.trace_id;
      const stop_id = stopInfo.id;
      let route_id;

      let type;

      vehicles.forEach((el) => {
        if (el.id == vehicle_id) {
          type = el.type;
        }
      });

      result.data.forEach((el2) => {
        if (el2.id == trace_id) {
          route_id = el2.routes[0].route_id;
        }
      });

      const ready = await getAllData(result.data, type, districts);

      dispatch(
        setTracesFromFullData({ traces: ready, vehicle_id: vehicle_id })
      );

      router.push(
        "/timetables/?route_id=" +
          route_id +
          "&stop_id=" +
          stop_id +
          "&trace_id=" +
          trace_id +
          "&vehicle_id=" +
          vehicle_id +
          "&other_route=true"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    stopInfo && (
      <View style={[globalStyles.card, { height: 220 }]}>
        <TouchableOpacity onPress={hideAll}>
          <Feather
            name="x"
            size={24}
            style={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 10,
              marginBottom: 4,
            }}
          >
            <MaterialCommunityIcons
              name="bus-stop-covered"
              size={28}
              color={Colors.PRIMARY}
            />
            <Text style={{ color: Colors.PRIMARY }}>Przystanek</Text>
          </View>
          <Text style={{ fontSize: 22, fontFamily: "outfit-medium" }}>
            {stopInfo.name + " " + stopInfo.number_of_stop}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            mode="contained"
            onPress={backToCoords}
            buttonColor={Colors.PRIMARY}
            style={{ marginRight: 10 }}
          >
            <Entypo name="location-pin" size={20} color="white" />
          </Button>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              justifyContent: "flex-end",
              alignItems: "center",
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            {routesInfo &&
              routesInfo.map((el, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleClickCheck(el)}
                >
                  <Text
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      color: Colors.PRIMARY,
                      borderWidth: 1,
                      borderColor: Colors.PRIMARY,
                    }}
                  >
                    {el.route}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </View>
    )
  );
};

export default CardInfo;
