import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const ToSearch = ({ text, setText, check }) => {
  return (
    <View
      style={{
        height: check ? 100 : 130,
        justifyContent: "flex-start",
        marginVertical: 10,
      }}
    >
      <Text
        style={{ fontSize: 18, marginBottom: 10, fontFamily: "outfit-medium" }}
      >
        Dokąd chcesz jechać?
      </Text>
      <TextInput
        mode="outlined"
        label="Do"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};

export default ToSearch;
