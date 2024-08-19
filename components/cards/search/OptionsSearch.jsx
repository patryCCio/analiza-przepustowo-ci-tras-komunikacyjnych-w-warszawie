import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { Colors } from "../../../constants/Colors";

const OptionsSearch = ({
  searchOption,
  setSearchOption,
  localizationOption,
  setLocalizationOption,
}) => {
  const setOption = (type) => {
    if (type == "l") {
      if (localizationOption) {
        setSearchOption(false);
        return;
      } else {
        setLocalizationOption(true);
        setSearchOption(false);
      }
    } else {
      if (searchOption) {
        setLocalizationOption(false);
        return;
      } else {
        setLocalizationOption(false);
        setSearchOption(true);
      }
    }
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text
        style={{ fontSize: 18, marginBottom: 10, fontFamily: "outfit-medium" }}
      >
        Jak chcesz nawigować?
      </Text>
      <View style={styles.checkbox_c}>
        <Checkbox
          status={localizationOption ? "checked" : "unchecked"}
          onPress={() => setOption("l")}
          color={Colors.PRIMARY}
        />
        <Text style={{ fontFamily: "outfit" }}>Z lokalizacji</Text>
      </View>
      <View style={styles.checkbox_c}>
        <Checkbox
          status={searchOption ? "checked" : "unchecked"}
          onPress={() => setOption("s")}
          color={Colors.PRIMARY}
        />
        <Text style={{ fontFamily: "outfit" }}>Z wyszukiwarki</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox_c: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default OptionsSearch;
