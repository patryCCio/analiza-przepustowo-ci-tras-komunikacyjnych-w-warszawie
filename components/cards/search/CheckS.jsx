import { Text, View } from "react-native";

const CheckS = ({ checkFrom, checkTo }) => {
  return (
    <View style={{ marginBottom: 20, gap: 20 }}>
      <View>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>Z</Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 14, textAlign: "justify" }}
        >
          {checkFrom.display_name}
        </Text>
      </View>
      <View>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>Do</Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 14, textAlign: "justify" }}
        >
          {checkTo.display_name}
        </Text>
      </View>
    </View>
  );
};

export default CheckS;
