import { Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const SearchItem = ({ item, handleCheckPress, type }) => {
  return (
    <Text
      style={{
        minHeight: 40,
        padding: 5,
        fontFamily: "outfit-medium",
      }}
      onPress={() => handleCheckPress(item, type)}
    >
      {item.display_name}
    </Text>
  );
};

export default SearchItem;
