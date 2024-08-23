import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ColorsNormal from "./trace/ColorsNormal";
import ColorsTraffic from "./trace/ColorsTraffic";
import ColorsDistrict from "./trace/ColorsDistrict";
import ColorsButtons from "./trace/ColorsButtons";
import { setButtons } from "../../context/redux/reducers/buttonsSlice";
import { setCards } from "../../context/redux/reducers/cardsSlice";
import ColorsTrafficFuture from "./trace/ColorsTrafficFuture";
const ColorsInfo = () => {
  const { routeNormal, routeFlow, routeFlowFuture, routeDistrict } =
    useSelector((state) => state.root.settings);

  const dispatch = useDispatch();

  const hideColors = () => {
    dispatch(setButtons({ choice: "colorsButton", data: true }));
    dispatch(setCards({ choice: "colorsCard", data: false }));
  };

  return (
    <View style={styles.card}>
      <View style={{ position: "relative", flex: 1, width: "100%" }}>
        {routeNormal && (
          <ColorsNormal hideColors={hideColors} styles={styles} />
        )}
        {routeFlow && <ColorsTraffic hideColors={hideColors} styles={styles} />}
        {routeFlowFuture && (
          <ColorsTrafficFuture hideColors={hideColors} styles={styles} />
        )}

        {routeDistrict && (
          <ColorsDistrict hideColors={hideColors} styles={styles} />
        )}

        <ColorsButtons styles={styles} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 160,
    left: "5%",
    backgroundColor: "white",
    width: "78%",
    height: 220,
    padding: 10,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    marginBottom: 10,
    fontFamily: "outfit-medium",
    fontSize: 18,
  },

  card_color: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  card_inner: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text_color: { fontFamily: "outfit", fontSize: 14 },
  card_buttons: {
    position: "absolute",
    width: "22%",
    right: -60,
    top: -10,
    height: 220,
    backgroundColor: "#eee",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card_buttons_inner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ColorsInfo;
