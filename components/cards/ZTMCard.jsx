import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import { setZTM } from "../../context/redux/reducers/callsSlice";
import ZTMItem from "./ZTMItem";
import { Colors } from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Loading from "../Loading";

const ZTMCard = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { ztm } = useSelector((state) => state.root.data);

  const getVehicles = async () => {
    if (ztm.length > 0) return;
    setIsLoading(true);
    try {
      const result = await api.get(
        process.env.EXPO_PUBLIC_API_URL + "timetables/vehicles"
      );
      dispatch(setZTM(result.data));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <ScrollView style={style.card}>
        <View style={{ paddingVertical: 30, gap: 20 }}>
          <View style={{ paddingTop: 20, backgroundColor: Colors.THIRD }}>
            <Text style={style.info1}>
              Surowe dane komunikacji miejskiej ZTM
            </Text>
            <Text style={style.info2}>https://api.um.warszawa.pl</Text>
            <Text style={style.info1}>Dane o przepływie ruchu</Text>
            <Text style={style.info2}>https://here.com</Text>
            <Text style={style.info1}>
              Dane statystyczne dla miasta Warszawa
            </Text>
            <Text style={style.info2}>https://stat.gov.pl/</Text>
          </View>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              fontSize: 18,
              fontFamily: "outfit-medium",
            }}
          >
            Zaznacz linie do analizy
          </Text>

          <View style={style.type}>
            <MaterialIcons
              name="directions-bus"
              color={Colors.PRIMARY}
              size={36}
            />
            <Text style={style.text}>Autobusy</Text>
          </View>
          <View style={style.items}>
            {ztm.map((item) => {
              if (item.type == "Autobus") {
                return (
                  <ZTMItem
                    key={item.id}
                    setIsLoading={setIsLoading}
                    dispatch={dispatch}
                    item={item}
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
            {ztm.map((item) => {
              if (item.type == "Tramwaj") {
                return (
                  <ZTMItem
                    key={item.id}
                    setIsLoading={setIsLoading}
                    dispatch={dispatch}
                    item={item}
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
            {ztm.map((item) => {
              if (item.type == "Pociąg") {
                return (
                  <ZTMItem
                    key={item.id}
                    setIsLoading={setIsLoading}
                    dispatch={dispatch}
                    item={item}
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 15,
    columnGap: 25,
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
