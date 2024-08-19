import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ZTMItem2 = ({ item }) => {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity onPress={() => router.push("/traces/?id=" + item.id)}>
        <View
          style={{
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            flexDirection: "row",
            flex: 1,
            borderColor: Colors.THIRD,
            minWidth: 0,
            borderWidth: 1,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              textAlign: "center",
              color: Colors.THIRD,
              fontSize: 14,
            }}
          >
            {item.route}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ZTMItem2;
