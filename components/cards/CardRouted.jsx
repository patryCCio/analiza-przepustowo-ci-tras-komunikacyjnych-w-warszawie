import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../constants/Globals";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndLocation,
  setOtherRoutes,
  setRoutes,
  setStartLocation,
} from "../../context/redux/reducers/routesSlice";
import { setOtherLocation } from "../../context/redux/reducers/locationSlice";

const CardRouted = () => {
  const { hideAll } = useContext(MapContext);
  const dispatch = useDispatch();

  const cancelTrace = () => {
    hideAll();
    dispatch(setEndLocation(null));
    dispatch(setStartLocation(null));
    dispatch(setRoutes([]));
  };

  const acceptTrace = () => {
    hideAll();
    dispatch(setOtherRoutes({ choice: "ride", data: true }));
    dispatch(setOtherLocation({ choice: "follow", data: true }));
    dispatch(setOtherLocation({ choice: "share", data: true }));
  };

  return (
    <View style={globalStyles.card2}>
      <TouchableOpacity onPress={cancelTrace}>
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
            marginBottom: 8,
            marginLeft: 8,
            fontFamily: "outfit-medium",
          }}
        >
          Trasa
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
          onPress={cancelTrace}
          buttonColor={Colors.PRIMARY}
        >
          Anuluj
        </Button>
        <Button
          mode="contained"
          onPress={acceptTrace}
          buttonColor={Colors.PRIMARY}
        >
          Prowadź
        </Button>
      </View>
    </View>
  );
};

export default CardRouted;
