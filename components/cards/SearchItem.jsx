import { Text } from "react-native";

const SearchItem = ({ item, handleCheckPress }) => {
  return (
    <Text
      style={{
        minHeight: 40,
        padding: 5,
        fontFamily: "outfit-medium",
      }}
      onPress={() => handleCheckPress(item)}
    >
      {item.display_name}
    </Text>
  );
};

export default SearchItem;
