import { TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setColors } from "../../../context/redux/reducers/settingsSlice";

const ColorsButtons = ({ styles }) => {
  const { routeDistrict, routeFlow, routeFlowFuture, routeNormal } = useSelector(
    (state) => state.root.settings
  );
  const dispatch = useDispatch();

  const handlePress = (choice) => {
    dispatch(setColors(choice));
  };

  return (
    <View style={styles.card_buttons}>
      <TouchableOpacity
        style={[
          styles.card_buttons_inner,
          {
            backgroundColor: routeNormal ? Colors.PRIMARY : "transparent",
          },
        ]}
        onPress={() => handlePress("routeNormal")}
      >
        <FontAwesome5
          name="route"
          size={24}
          color={routeNormal ? "white" : Colors.SECOND}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.card_buttons_inner,
          {
            backgroundColor: routeFlow ? Colors.PRIMARY : "transparent",
          },
        ]}
        onPress={() => handlePress("routeFlow")}
      >
        <Entypo
          name="traffic-cone"
          size={24}
          color={routeFlow ? "white" : Colors.SECOND}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.card_buttons_inner,
          {
            backgroundColor: routeFlowFuture ? Colors.PRIMARY : "transparent",
          },
        ]}
        onPress={() => handlePress("routeFlowFuture")}
      >
        <FontAwesome5
          name="clock"
          size={24}
          color={routeFlowFuture ? "white" : Colors.SECOND}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.card_buttons_inner,
          {
            backgroundColor: routeDistrict ? Colors.PRIMARY : "transparent",
          },
        ]}
        onPress={() => handlePress("routeDistrict")}
      >
        <Entypo
          name="map"
          size={24}
          color={routeDistrict ? "white" : Colors.SECOND}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ColorsButtons;
