import { StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/Colors";

const Dots = ({ actualIndex, localizationOption }) => {
  if (localizationOption) {
    return (
      <View style={styles.main}>
        <View style={styles.addons}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  actualIndex >= 0 ? Colors.PRIMARY : "transparent",
                borderColor: actualIndex >= 0 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor: actualIndex >= 1 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
        </View>
        <View style={styles.addons}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  actualIndex >= 1 ? Colors.PRIMARY : "transparent",
                borderColor: actualIndex >= 1 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor: actualIndex >= 2 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
        </View>
        <View style={styles.addons}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  actualIndex >= 2 ? Colors.PRIMARY : "transparent",
                borderColor: actualIndex >= 2 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        <View style={styles.addons}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  actualIndex >= 0 ? Colors.PRIMARY : "transparent",
                borderColor: actualIndex >= 0 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor: actualIndex >= 1 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
        </View>
        <View style={styles.addons}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  actualIndex >= 1 ? Colors.PRIMARY : "transparent",
                borderColor: actualIndex >= 1 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor: actualIndex >= 2 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
        </View>
        <View style={styles.addons}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  actualIndex >= 2 ? Colors.PRIMARY : "transparent",
                borderColor: actualIndex >= 2 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor: actualIndex >= 3 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
        </View>
        <View style={styles.addons}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  actualIndex >= 3 ? Colors.PRIMARY : "transparent",
                borderColor: actualIndex >= 3 ? Colors.PRIMARY : "gray",
              },
            ]}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    marginTop: 10,
  },

  addons: {
    alignItems: "center",
    flexDirection: "row",
  },

  line: {
    height: 2,
    width: 40,
  },

  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
  },
});

export default Dots;
