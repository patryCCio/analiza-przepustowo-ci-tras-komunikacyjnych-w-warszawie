import { globalStyles } from "../../constants/Globals";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, Checkbox } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";

const CardSettings = () => {
  const {
    hideAll,
    showStops,
    setShowStops,
    showTrafficFlow,
    setShowTrafficFlow,
  } = useContext(MapContext);

  return (
    <View style={globalStyles.card}>
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
              status={showStops ? "checked" : "unchecked"}
              onPress={() => {
                setShowStops(!showStops);
              }}
            />
            <Text style={{ fontFamily: "outfit" }}>Pokaż przystanki</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              color={Colors.PRIMARY}
              status={showTrafficFlow ? "checked" : "unchecked"}
              onPress={() => {}}
            />
            <Text style={{ fontFamily: "outfit" }}>Pokaż przepływ ruchu</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardSettings;
