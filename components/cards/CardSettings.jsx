import { globalStyles } from "../../constants/Globals";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../context/redux/reducers/settingsSlice";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import { setButtons } from "../../context/redux/reducers/buttonsSlice";

const CardSettings = () => {
  const { isStopsMap, isDistrictMap, isRouteZTMMap } = useSelector(
    (state) => state.root.settings
  );

  const { hideAll } = useContext(MapContext);

  const dispatch = useDispatch();

  const handleClickShow = () => {
    dispatch(
      setSettings({
        choice: "routeZTMMap",
        data: !isRouteZTMMap,
      })
    );
    dispatch(setButtons({ choice: "colorsButton", data: !isRouteZTMMap }));
  };

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
                  setSettings({ data: !isStopsMap, choice: "stopsMap" })
                );
              }}
            />
            <Text style={{ fontFamily: "outfit" }}>Pokaż przystanki</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              color={Colors.PRIMARY}
              status={isDistrictMap ? "checked" : "unchecked"}
              onPress={() => {
                dispatch(
                  setSettings({
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
              onPress={handleClickShow}
            />
            <Text style={{ fontFamily: "outfit" }}>Pokaż trasy ZTM</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardSettings;
