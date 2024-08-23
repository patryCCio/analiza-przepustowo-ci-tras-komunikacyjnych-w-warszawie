import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../../context/redux/reducers/settingsSlice";

const ColorsNormal = ({ styles, hideColors }) => {
  const { showStopsNormal } = useSelector((state) => state.root.settings);

  const dispatch = useDispatch();

  return (
    <>
      <TouchableOpacity style={{ zIndex: 200 }} onPress={hideColors}>
        <Feather
          name="x"
          size={24}
          style={{
            position: "absolute",
            right: 10,
            top: 0,
          }}
          color={Colors.PRIMARY}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Trasy</Text>
      <View style={styles.card_inner}>
        <View
          style={[styles.card_color, { backgroundColor: Colors.PRIMARY }]}
        />
        <Text style={styles.text_color}>Autobusy</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "#df0000" }]} />
        <Text style={styles.text_color}>Tramwaje</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "#008000" }]} />
        <Text style={styles.text_color}>Pociągi</Text>
      </View>
      <View
        style={{
          width: "100%",
          left: -10,
          marginTop: 20,
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          color={Colors.PRIMARY}
          onPress={() =>
            dispatch(
              setSettings({ choice: "showStopsNormal", data: !showStopsNormal })
            )
          }
          status={showStopsNormal ? "checked" : "unchecked"}
        />
        <Text style={{ fontFamily: "outfit" }}>Pokaż przystanki dla tras</Text>
      </View>
    </>
  );
};

export default ColorsNormal;
