import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ColorsNormal from "./trace/ColorsNormal";
import ColorsTraffic from "./trace/ColorsTraffic";
import ColorsDistrict from "./trace/ColorsDistrict";
import ColorsButtons from "./trace/ColorsButtons";
import { setButtons } from "../../context/redux/reducers/buttonsSlice";
import { setCards } from "../../context/redux/reducers/cardsSlice";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import LoadingTrace from "../LoadingTrace";

const ColorsInfo = () => {
  const { routeNormal, routeFlow, routeDistrict } = useSelector(
    (state) => state.root.settings
  );

  const { loadingNormal, loadingFlow } = useContext(MapContext);
  const { count_of_active } = useSelector((state) => state.root.data);

  const [actualState, setActualState] = useState(1);

  const dispatch = useDispatch();

  const hideColors = () => {
    dispatch(setButtons({ choice: "colorsButton", data: true }));
    dispatch(setCards({ choice: "colorsCard", data: false }));
  };

  useEffect(() => {
    if (routeNormal) {
      if (loadingNormal) {
        setActualState(1);
      } else {
        setActualState(11);
      }
    } else if (routeFlow) {
      if (loadingFlow) {
        setActualState(2);
      } else {
        setActualState(22);
      }
    } else if (routeDistrict) {
      if (loadingNormal) {
        setActualState(3);
      } else {
        setActualState(33);
      }
    }
  }, [routeNormal, routeFlow, routeDistrict, loadingFlow, loadingNormal]);

  return (
    <View style={styles.card}>
      <View style={{ position: "relative", flex: 1, width: "100%" }}>
        {count_of_active > 0 ? (
          <>
            {actualState == 1 && (
              <LoadingTrace text={"Ładowanie danych o trasach!"} />
            )}
            {actualState == 11 && (
              <ColorsNormal hideColors={hideColors} styles={styles} />
            )}

            {actualState == 2 && (
              <LoadingTrace text={"Ładowanie danych o trasach!"} />
            )}
            {actualState == 22 && (
              <ColorsTraffic hideColors={hideColors} styles={styles} />
            )}

            {actualState == 3 && (
              <LoadingTrace text={"Ładowanie danych o trasach!"} />
            )}
            {actualState == 33 && (
              <ColorsDistrict hideColors={hideColors} styles={styles} />
            )}
          </>
        ) : (
          <>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 16,
                color: "tomato",
              }}
            >
              Musisz zaznaczyć przynajmniej jedną trasę!
            </Text>
          </>
        )}
        {!loadingNormal && <ColorsButtons styles={styles} />}
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
    height: 250,
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
    height: 250,
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
