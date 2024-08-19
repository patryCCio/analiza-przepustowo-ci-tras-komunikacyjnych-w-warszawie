import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const ColorsInfo = () => {
  return (
    <View style={styles.card}>
      <View style={styles.card_inner}>
        <View
          style={[styles.card_color, { backgroundColor: Colors.PRIMARY }]}
        />
        <Text style={{ fontFamily: "outfit-bold" }}>Autobusy</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "#df0000" }]} />
        <Text style={{ fontFamily: "outfit-bold" }}>Tramwaje</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "#008000" }]} />
        <Text style={{ fontFamily: "outfit-bold" }}>Pociągi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "white",
    width: 150,
    padding: 10,
    borderRadius: 12,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  card_color: {
    width: 30,
    height: 8,
    borderRadius: 4,
  },
  card_inner: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ColorsInfo;
