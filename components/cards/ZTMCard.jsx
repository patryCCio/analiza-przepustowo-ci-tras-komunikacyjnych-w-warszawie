import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ZTMItem from "./ZTMItem";
import { Colors } from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { Button } from "react-native-paper";
import { setAllActivesFalse } from "../../context/redux/reducers/mainSlice";

const ZTMCard = () => {
  const dispatch = useDispatch();
  const { vehicles, stops, districts, count_of_active } = useSelector(
    (state) => state.root.data
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vehicles.length > 0 && stops.length > 0) {
      setLoading(false);
    }
  }, [vehicles, stops]);

  const handlePress = () => {
    setLoading(true);
    dispatch(setAllActivesFalse());
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <ScrollView style={[style.card, { position: "relative" }]}>
      <View style={{ paddingVertical: 30, gap: 10 }}>
        <View style={{ paddingLeft: 20, alignItems: "flex-start", flex: 1 }}>
          <Button
            style={{ marginTop: 40, width: 220 }}
            mode="contained"
            onPress={handlePress}
          >
            Odznacz wszystko
          </Button>
        </View>

        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 24,
            fontFamily: "outfit-medium",
          }}
        >
          Zaznacz linie do analizy
        </Text>
        <Text
          style={{
            top: -15,
            paddingHorizontal: 20,
            fontSize: 18,
            fontFamily: "outfit-medium",
            color: "tomato",
          }}
        >
          Max 2 trasy
        </Text>

        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 20,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.PRIMARY,
              fontSize: 20,
            }}
          >
            Zaznaczonych tras:
          </Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: Colors.SECOND,
              fontSize: 26,
            }}
          >
            {count_of_active}/2
          </Text>
        </View>

        <View style={style.type}>
          <MaterialIcons
            name="directions-bus"
            color={Colors.PRIMARY}
            size={36}
          />
          <Text style={style.text}>Autobusy</Text>
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "1") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "2") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "3") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "4") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "5") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "7") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>

        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "N") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>
        <View style={style.type}>
          <MaterialIcons name="tram" color={Colors.PRIMARY} size={36} />
          <Text style={[style.text]}>Tramwaje</Text>
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Tramwaj") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>
        <View style={style.type}>
          <MaterialIcons name="train" color={Colors.PRIMARY} size={36} />
          <Text style={[style.text]}>Pociągi</Text>
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Pociąg") {
              return (
                <ZTMItem
                  stops={stops}
                  key={item.id}
                  dispatch={dispatch}
                  item={item}
                  districts={districts}
                />
              );
            }
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  card: {
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 200,
    height: "100%",
    backgroundColor: "white",
  },
  items: {
    position: "relative",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 10,
    columnGap: 10,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "outfit-medium",
    fontSize: 32,
    paddingHorizontal: 20,
    textAlign: "start",
    color: Colors.PRIMARY,
  },
  type: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 17,
  },

  info1: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "outfit",
    color: "white",
  },

  info2: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
    fontSize: 14,
    fontFamily: "outfit-bold",
    color: Colors.FOURTH,
  },
});

export default ZTMCard;
