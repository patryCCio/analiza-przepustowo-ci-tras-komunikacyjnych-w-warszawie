import { Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import {
  setIsActive,
  setIsActiveRoute,
} from "../../context/redux/reducers/callsSlice";
import { TouchableOpacity } from "react-native";
import {
  getRoutesForTrace,
  getRoutesInfo,
} from "../../context/redux/functions";
import AntDesign from "@expo/vector-icons/AntDesign";

const ZTMItem = ({ item, dispatch, setIsLoading }) => {
  const getDataAll = () => {
    if (!item.routes) {
      getRoutesInfo(dispatch, item, setIsLoading);
    }
    dispatch(setIsActive(item.id, setIsLoading));
  };

  const handlePress = (route) => {
    if (route == "route2" && !item.route2.data) return;
    dispatch(setIsActiveRoute({ id: item.id, route: route }));
    if (route == "route1" && item.route1_coords) return;
    if (route == "route2" && item.route2_coords) return;
    getRoutesForTrace(dispatch, item, route);
  };

  return (
    <>
      <TouchableOpacity onPress={getDataAll}>
        <View
          style={{
            height: item.is_active ? 100 : 30,
            justifyContent: "center",
            alignItems: "center",
            width: item.is_active ? "100%" : 50,
            flexDirection: "row",
            flex: 1,
            borderColor: Colors.THIRD,
            minWidth: item.is_active ? "100%" : 0,
            borderWidth: 1,
            backgroundColor: item.is_active ? Colors.THIRD : "white",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              textAlign: "center",
              color: item.is_active ? "white" : Colors.THIRD,
              fontSize: item.is_active ? 26 : 14,
            }}
          >
            {item.route}
          </Text>
        </View>
      </TouchableOpacity>

      {item.route1 && item.route2 && item.is_active && (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => handlePress("route1")}
            style={{
              width: item.route2.data ? "47%" : "94%",
              alignItems: "center",
              flex: 1,
            }}
          >
            {item.route1.data && (
              <View
                style={{
                  flexDirection: "column",
                  gap: 40,
                  paddingHorizontal: 10,
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                  borderColor: !item.route1.is_active ? "gray" : Colors.THIRD,
                  borderWidth: 1,
                  backgroundColor: !item.route1.is_active
                    ? "white"
                    : Colors.THIRD,
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit",
                    paddingVertical: 10,
                    color: item.route1.is_active ? "white" : "black",
                  }}
                >
                  {item.route1.data[0].name}
                </Text>
                <AntDesign
                  name="arrowdown"
                  size={32}
                  color={item.route1.is_active ? "white" : "black"}
                />
                <Text
                  style={{
                    fontFamily: "outfit",
                    paddingVertical: 10,
                    color: item.route1.is_active ? "white" : "black",
                  }}
                >
                  {item.route1.data[0].direction_route}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("route2")}
            style={{ width: "47%", alignItems: "center", flex: 1 }}
          >
            {item.route2.data ? (
              <View
                style={{
                  flexDirection: "column",
                  gap: 40,
                  paddingHorizontal: 10,
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                  borderColor: !item.route2.is_active ? "gray" : Colors.THIRD,
                  borderWidth: 1,
                  backgroundColor: item.route2.is_active
                    ? Colors.THIRD
                    : "white",
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit",
                    paddingVertical: 10,
                    color: !item.route2.is_active ? "black" : "white",
                  }}
                >
                  {item.route2.data[0].name}
                </Text>
                <AntDesign
                  name="arrowdown"
                  size={32}
                  color={item.route2.is_active ? "white" : "black"}
                />
                <Text
                  style={{
                    fontFamily: "outfit",
                    paddingVertical: 10,
                    color: !item.route2.is_active ? "black" : "white",
                  }}
                >
                  {item.route2.data[0].direction_route}
                </Text>
              </View>
            ) : (
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Text style={{ fontFamily: "outfit-bold" }}>Brak danych!</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ZTMItem;
