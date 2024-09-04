import { AntDesign, Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { useContext } from "react";
import { MapContext } from "../../../context/MapContext";
import { Checkbox } from "react-native-paper";

const ColorsTraffic = ({ hideColors, styles }) => {
  const {
    actualOrderTime,
    setActualOrderTime,
    showAccidents,
    setShowAccidents,
  } = useContext(MapContext);

  const handlePressChangeMin = (type) => {
    if (type == "left") {
      if (actualOrderTime == 0) {
        setActualOrderTime(2);
      } else setActualOrderTime((prevState) => prevState - 1);
    } else {
      if (actualOrderTime == 2) {
        setActualOrderTime(0);
      } else setActualOrderTime((prevState) => prevState + 1);
    }
  };

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
      <Text style={styles.title}>Przepływ ruchu</Text>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "#8f0909" }]} />
        <Text style={styles.text_color}>Bardzo duże zagęszczenie</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "orangered" }]} />
        <Text style={styles.text_color}>Duże zagęszczenie</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "gold" }]} />
        <Text style={styles.text_color}>Średnie zagęszczenie</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "green" }]} />
        <Text style={styles.text_color}>Małe zagęszczenie</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "royalblue" }]} />
        <Text style={styles.text_color}>Bardzo małe zagęszczenie</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "gray" }]} />
        <Text style={styles.text_color}>Brak danych = małe zagęszczenie</Text>
      </View>

      <View
        style={{
          width: "100%",
          left: -10,
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          color={Colors.PRIMARY}
          onPress={() => setShowAccidents((prevState) => !prevState)}
          status={showAccidents ? "checked" : "unchecked"}
        />
        <Text style={{ fontFamily: "outfit" }}>Pokaż zdarzenia drogowe</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 15,
            gap: 40,
          }}
        >
          <AntDesign
            onPress={() => handlePressChangeMin("left")}
            name="left"
            size={36}
            color={Colors.PRIMARY}
          />
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 18,
              width: 80,
              textAlign: "center",
            }}
          >
            {actualOrderTime == 0
              ? "Aktualnie"
              : "+ " + actualOrderTime * 15 + " min"}
          </Text>
          <AntDesign
            onPress={() => handlePressChangeMin("right")}
            name="right"
            size={36}
            color={Colors.PRIMARY}
          />
        </View>
      </View>
    </>
  );
};

export default ColorsTraffic;
