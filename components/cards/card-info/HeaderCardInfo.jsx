import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ColorsButtons from "../trace/ColorsButtons";
import { Colors } from "../../../constants/Colors";

const HeaderCardInfo = ({ hideAll, traceInfo, text }) => {
  return (
    <View
      style={{
        gap: 20,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
      }}
    >
      <TouchableOpacity onPress={hideAll}>
        <Feather
          name="x"
          size={24}
          style={{
            position: "absolute",
            right: 5,
            top: 0,
            zIndex: 1,
          }}
          color={Colors.PRIMARY}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.generalInfo}>
          {traceInfo.type == "Autobus" && (
            <MaterialIcons
              name="directions-bus"
              color={Colors.PRIMARY}
              size={64}
            />
          )}
          {traceInfo.type == "Tramwaj" && (
            <MaterialIcons name="tram" color={Colors.PRIMARY} size={36} />
          )}
          {traceInfo.type == "Pociąg" && (
            <MaterialIcons name="train" color={Colors.PRIMARY} size={36} />
          )}
          <Text style={styles.name}>{traceInfo.route}</Text>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
            {text}
          </Text>
          <ColorsButtons styles={styles} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: "outfit-bold",
    fontSize: 48,
    color: Colors.PRIMARY,
  },
  generalInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  card_buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  card_buttons_inner: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderCardInfo;
