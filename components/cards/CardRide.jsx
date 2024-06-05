import { Text, View } from "react-native";
import { globalStyles } from "../../constants/Globals";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import { Colors } from "../../constants/Colors";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  setEndLocation,
  setRoutes,
  setStartLocation,
} from "../../context/redux/reducers/routesSlice";
import { setOtherLocation } from "../../context/redux/reducers/locationSlice";

const CardRide = ({ stopInterval }) => {
  const { hideAll } = useContext(MapContext);
  const dispatch = useDispatch();

  const deleteTrace = () => {
    hideAll();
    dispatch(setOtherLocation({ choice: "ride", data: false }));
    dispatch(setOtherLocation({ choice: "follow", data: false }));
    dispatch(setOtherLocation({ choice: "share", data: false }));
    dispatch(setStartLocation(null));
    dispatch(setEndLocation(null));
    dispatch(setRoutes([]));

    stopInterval();
  };

  return (
    <View style={globalStyles.card2Top}>
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
            paddingTop: 20,
            marginLeft: 8,
            fontFamily: "outfit-medium",
          }}
        >
          Przewidywany czas podróży
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
          onPress={deleteTrace}
          buttonColor={Colors.PRIMARY}
        >
          Zakończ trasę
        </Button>
        <Text
          style={{
            color: Colors.SECOND,
            fontFamily: "outfit-bold",
            fontSize: 26,
            textAlign: "center",
            flex: 1,
          }}
        >
          30 min
        </Text>
      </View>
    </View>
  );
};

export default CardRide;
