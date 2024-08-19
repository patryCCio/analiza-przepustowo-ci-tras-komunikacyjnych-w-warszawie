import { StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "../constants/Colors";

const LoadingCard = () => {
  return (
    <ActivityIndicator
      size="large"
      style={{
        width: "100%",
        top: 0,
        left: 0,
        height: 200,
        backgroundColor: "red",
        zIndex: 100,
        position: "absolute",
        transform: [{ scale: 3 }],
      }}
      color={Colors.PRIMARY}
    />
  );
};

export default LoadingCard;
