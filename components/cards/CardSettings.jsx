import { globalStyles } from "../../constants/Globals";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setOtherLayers } from "../../context/redux/reducers/layersSlice";

const CardSettings = ({ hideAll }) => {
  const { isStopsMap, isTrafficFlowMap, isDistrictMap, isRouteZTMMap } =
    useSelector((state) => state.root.layers);
  const dispatch = useDispatch();

  return (
    <View style={globalStyles.cardBigger}>
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
          <Text
            style={{
              color: "black",
              fontSize: 20,
              marginBottom: 14,
              marginLeft: 8,
              fontFamily: "outfit-medium",
            }}
          >
            Ustawienia
          </Text>
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              color={Colors.PRIMARY}
              status={isStopsMap ? "checked" : "unchecked"}
              onPress={() => {
                dispatch(
                  setOtherLayers({ data: !isStopsMap, choice: "stopsMap" })
                );
              }}
            />
            <Text style={{ fontFamily: "outfit" }}>Pokaż przystanki</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              color={Colors.PRIMARY}
              status={isTrafficFlowMap ? "checked" : "unchecked"}
              onPress={() => {
                dispatch(
                  setOtherLayers({
                    choice: "trafficFlowMap",
                    data: !isTrafficFlowMap,
                  })
                );
              }}
            />
            <Text style={{ fontFamily: "outfit" }}>
              Pokaż prognozę ruchu (HERE TRAFFIC)
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              color={Colors.PRIMARY}
              status={isDistrictMap ? "checked" : "unchecked"}
              onPress={() => {
                dispatch(
                  setOtherLayers({
                    choice: "districtMap",
                    data: !isDistrictMap,
                  })
                );
              }}
            />
            <Text style={{ fontFamily: "outfit" }}>
              Pokaż dzielnice Warszawy
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              color={Colors.PRIMARY}
              status={isRouteZTMMap ? "checked" : "unchecked"}
              onPress={() => {
                dispatch(
                  setOtherLayers({
                    choice: "routeZTMMap",
                    data: !isRouteZTMMap,
                  })
                );
              }}
            />
            <Text style={{ fontFamily: "outfit" }}>Pokaż trasy ZTM</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardSettings;
