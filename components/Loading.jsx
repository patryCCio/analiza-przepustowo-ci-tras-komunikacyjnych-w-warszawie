import {
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../constants/Colors";

const Loading = () => {
  return (
    <ActivityIndicator
      size="large"
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
      color={Colors.PRIMARY}
    />
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    zIndex: 200,
    backgroundColor: Colors.FOURTH,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default Loading;
