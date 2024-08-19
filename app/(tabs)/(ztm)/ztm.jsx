import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import ZTMItem2 from "../../../components/cards/ZTMItem2";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { useNavigation } from "expo-router";

const ztm = () => {
  const { vehicles } = useSelector((state) => state.root.data);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (!loading) {
      navigation.setOptions({
        headerShown: true,
        title: "Komunikacja miejska ZTM",
      });
    }
  }, [loading]);

  useEffect(() => {
    if (vehicles.length > 0) {
      setLoading(false);
    }
  }, [vehicles]);

  return loading ? (
    <Loading />
  ) : (
    <ScrollView style={style.card}>
      <View style={{ paddingVertical: 30, gap: 20 }}>
        <View style={{ paddingTop: 20, backgroundColor: Colors.THIRD }}>
          <Text style={style.info1}>Surowe dane komunikacji miejskiej ZTM</Text>
          <Text style={style.info2}>https://api.um.warszawa.pl</Text>
          <Text style={style.info1}>Dane o przepływie ruchu</Text>
          <Text style={style.info2}>https://here.com</Text>
          <Text style={style.info1}>Dane statystyczne dla miasta Warszawa</Text>
          <Text style={style.info2}>https://stat.gov.pl/</Text>
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
              return <ZTMItem2 key={item.id} item={item} />;
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "2") {
              return <ZTMItem2 key={item.id} item={item} />;
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "3") {
              return <ZTMItem2 key={item.id} item={item} />;
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "4") {
              return <ZTMItem2 key={item.id} item={item} />;
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "5") {
              return <ZTMItem2 key={item.id} item={item} />;
            }
          })}
        </View>
        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "7") {
              return <ZTMItem2 key={item.id} item={item} />;
            }
          })}
        </View>

        <View style={style.items}>
          {vehicles.map((item) => {
            if (item.type == "Autobus" && item.route[0] == "N") {
              return <ZTMItem2 key={item.id} item={item} />;
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
              return <ZTMItem2 key={item.id} item={item} />;
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
              return <ZTMItem2 key={item.id} item={item} />;
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

export default ztm;
