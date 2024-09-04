import { ActivityIndicator, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

const LoadingTrace = ({ text }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <ActivityIndicator
        size="large"
        style={{
          width: "100%",
          height: 100,
          zIndex: 100,
          transform: [{ scale: 3 }],
        }}
        color={Colors.PRIMARY}
      />
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 16,
          color: Colors.PRIMARY,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default LoadingTrace;
