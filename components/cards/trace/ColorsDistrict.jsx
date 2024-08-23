import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";

const ColorsDistrict = ({ styles, hideColors }) => {
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
      <Text style={styles.title}>Trasy - dzielnice</Text>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "gold" }]} />
        <Text style={styles.text_color}>Bemowo, Wesoła, Śródmieście</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "orangered" }]} />
        <Text style={styles.text_color}>Wawer, Ochota, Żoliborz</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "royalblue" }]} />
        <Text style={styles.text_color}>Wola, Praga-Południe</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "black" }]} />
        <Text style={styles.text_color}>Bielany, Praga-Północ</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "gray" }]} />
        <Text style={styles.text_color}>Wilanów, Targówek, Włochy</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "pink" }]} />
        <Text style={styles.text_color}>Białołęka, Ursus, Mokotów</Text>
      </View>
      <View style={styles.card_inner}>
        <View style={[styles.card_color, { backgroundColor: "#008000" }]} />
        <Text style={styles.text_color}>Rembertów, Ursynów</Text>
      </View>
      <View style={styles.card_inner}>
        <View
          style={[styles.card_color, { backgroundColor: Colors.PRIMARY }]}
        />
        <Text style={styles.text_color}>Poza miastem</Text>
      </View>
    </>
  );
};

export default ColorsDistrict;
