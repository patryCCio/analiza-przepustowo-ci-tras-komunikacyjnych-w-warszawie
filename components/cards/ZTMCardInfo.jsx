import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../../constants/Globals";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";

const ZTMCardInfo = () => {

  const {traceInfo, hideAll} = useContext(MapContext);

  return (
    traceInfo && (
      <View style={[globalStyles.cardZTM, { paddingTop: 40 }]}>
        <TouchableOpacity onPress={hideAll}>
          <Feather
            name="x"
            size={24}
            style={{
              position: "absolute",
              right: 5,
              top: -30,
              zIndex: 1,
            }}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <ScrollView
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <View style={style.generalInfo}>
            {traceInfo.type == "Autobus" && (
              <MaterialIcons
                name="directions-bus"
                color={Colors.PRIMARY}
                size={36}
              />
            )}
            {traceInfo.type == "Tramwaj" && (
              <MaterialIcons name="tram" color={Colors.PRIMARY} size={36} />
            )}
            {traceInfo.type == "Pociąg" && (
              <MaterialIcons name="train" color={Colors.PRIMARY} size={36} />
            )}
            <Text style={style.name}>{traceInfo.route}</Text>
          </View>
        </ScrollView>
      </View>
    )
  );
};

const style = StyleSheet.create({
  name: {
    fontFamily: "outfit-bold",
    fontSize: 26,
    color: Colors.PRIMARY,
  },
  generalInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  info2: {
    marginBottom: 15,
    gap: 8,
  },
  info2_text_2: {
    fontSize: 16,
    fontFamily: "outfit",
    textAlign: "center",
    marginBottom: 10,
  },
  info2_text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
  from_to: {
    alignItems: "center",
  },

  from_to_text: {
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
  stops: {
    alignItems: "center",
  },
});

export default ZTMCardInfo;
