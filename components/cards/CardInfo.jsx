import { globalStyles } from "../../constants/Globals";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import { useContext, useEffect } from "react";
import { MapContext } from "../../context/MapContext";

const CardInfo = ({ routesInfo, infoMessage, hideAll }) => {
  const { fitToCoords } = useContext(MapContext);

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
          style={{ marginRight: 10 }}
        >
          <Entypo name="location-pin" size={20} color="white" />
        </Button>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {routesInfo.map((el) => (
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
          ))}
        </View>
      </View>
    </View>
  );
};

export default CardInfo;
