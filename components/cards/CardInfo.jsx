import { globalStyles } from "../../constants/Globals";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";

const CardInfo = () => {
  const { hideAll, fitToCoords, infoMessage } = useContext(MapContext);

  const backToCoords = () => {
    const coords = [
      { latitude: infoMessage.latitude, longitude: infoMessage.longitude },
      {
        latitude: infoMessage.latitude + 0.003,
        longitude: infoMessage.longitude - 0.003,
      },
      {
        latitude: infoMessage.latitude - 0.003,
        longitude: infoMessage.longitude - 0.003,
      },
      {
        latitude: infoMessage.latitude + 0.003,
        longitude: infoMessage.longitude + 0.003,
      },
      {
        latitude: infoMessage.latitude - 0.003,
        longitude: infoMessage.longitude + 0.003,
      },
    ];
    fitToCoords(coords);
  };

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
          <MaterialCommunityIcons
            name="bus-stop-covered"
            size={28}
            color={Colors.PRIMARY}
          />
          <Text style={{ color: Colors.PRIMARY }}>Przystanek</Text>
        </View>
        <Text style={{ fontSize: 22, fontFamily: "outfit-medium" }}>
          {infoMessage.name + " " + infoMessage.number_of_stop}
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
        >
          <Entypo name="location-pin" size={20} color="white" />
        </Button>

        <Button
          icon={() => (
            <FontAwesome5 name="info-circle" size={20} color="white" />
          )}
          mode="contained"
          onPress={() => console.log("Pressed")}
          buttonColor={Colors.PRIMARY}
        >
          Zobacz więcej
        </Button>
      </View>
    </View>
  );
};

export default CardInfo;
