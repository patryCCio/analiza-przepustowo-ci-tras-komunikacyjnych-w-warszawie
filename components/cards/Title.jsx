import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const Title = ({ text }) => {
  return (
    <View style={style.info}>
      <Text style={style.title}>{text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontFamily: "outfit-medium",
    fontSize: 22,
    color: "white",
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    padding: 8,
    textAlign: "center",
    borderRadius: 4,
  },

  info: {
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
});

export default Title;
