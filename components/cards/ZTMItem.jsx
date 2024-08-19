import { Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { getRoutes, getTraces } from "../../context/redux/functions";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  setIsActiveTrace,
  setIsActiveVehicle,
} from "../../context/redux/reducers/mainSlice";

const ZTMItem = ({ stops, item, dispatch }) => {
  const getDataAll = () => {
    if (!item.traces) {
      getTraces(dispatch, item);
    }
    dispatch(setIsActiveVehicle(item.id));
  };

  const handlePress = (trace) => {
    if (!trace.routes) {
      getRoutes(dispatch, item, trace, stops);
    }
    dispatch(setIsActiveTrace({ vehicle_id: item.id, trace_id: trace.id }));
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
      {item.traces && item.is_active && (
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          {item.traces.length > 0 &&
            item.is_active &&
            item.traces.map((trace) => {
              return (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: Colors.PRIMARY,
                    padding: 10,
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: trace.is_active
                      ? Colors.PRIMARY
                      : "transparent",
                  }}
                  key={trace.id}
                  onPress={() => handlePress(trace)}
                >
                  <View
                    style={{ flex: 1, alignItems: "flex-start", width: "100%" }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit-medium",
                        fontSize: 16,
                        color: trace.is_active ? "white" : "black",
                      }}
                    >
                      {trace.stop_from}
                    </Text>
                  </View>
                  <FontAwesome
                    name="long-arrow-right"
                    size={64}
                    color={trace.is_active ? "white" : Colors.PRIMARY}
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
                        color: trace.is_active ? "white" : "black",
                      }}
                    >
                      {trace.stop_end}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      )}
    </>
  );
};

export default ZTMItem;
