import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";

const ColorsTraffic = ({ styles, hideColors }) => {
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
    </>
  );
};

export default ColorsTraffic;
