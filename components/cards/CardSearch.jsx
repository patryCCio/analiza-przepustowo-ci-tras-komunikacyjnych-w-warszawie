import { globalStyles } from "../../constants/Globals";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { Button, TextInput } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import axios from "axios";
import SearchItem from "./SearchItem";

const CardSearch = () => {
  const {
    hideAll,
    setEndLocation,
    setStartLocation,
    setRouteCoordinates,
    setIsRouted,
    fitToCoords,
  } = useContext(MapContext);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState(null);

  const [checkFrom, setCheckFrom] = useState(null);
  const [checkTo, setCheckTo] = useState(null);

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (from != "") {
      if (checkFrom) {
        setType(null);
        setSearchResult([]);
      } else {
        setType("from");
        checkQueryFrom();
      }
    }

    if (to != "") {
      if (checkTo) {
        setType(null);
        setSearchResult([]);
      } else {
        setType("to");
        checkQueryTo();
      }
    }
  }, [from, to]);

  const checkQueryFrom = async () => {
    if (from == "") return;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${from}&addressdetails=1&countrycodes=pl`;
    const data = await axios.get(nominatimUrl);
    if (data.data) {
      setSearchResult(data.data);
    }
  };

  const clearCheck = (type) => {
    if (type == "from") {
      setCheckFrom(null);
      setFrom("");
      setType(null);
    } else {
      setCheckTo(null);
      setTo("");
      setType(null);
    }
  };

  const checkQueryTo = async () => {
    setType("to");
    if (to == "") return;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${to}&addressdetails=1&countrycodes=pl`;
    const data = await axios.get(nominatimUrl);
    if (data.data) {
      setSearchResult(data.data);
    }
  };

  const handleCheckPress = (item, type) => {
    if (type == "from") {
      setFrom(item.display_name);
      setCheckFrom(item);
    } else {
      setTo(item.display_name);
      setCheckTo(item);
    }
    setSearchResult([]);
    setType(null);
  };

  const getRoute = () => {
    if (from == "" || to == "" || !checkFrom || !checkTo) return;

    const latFrom = parseFloat(checkFrom.lat);
    const longFrom = parseFloat(checkFrom.lon);
    const latTo = parseFloat(checkTo.lat);
    const longTo = parseFloat(checkTo.lon);

    setStartLocation({
      longitude: longFrom,
      latitude: latFrom,
    });

    setEndLocation({
      longitude: longTo,
      latitude: latTo,
    });

    const string =
      process.env.EXPO_PUBLIC_API_OSRM +
      `${longFrom},${latFrom};${longTo},${latTo}?overview=full&geometries=geojson&steps=true`;

    const coords = [
      { longitude: longFrom, latitude: latFrom },
      { longitude: longTo, latitude: latTo },
    ];

    axios.get(string).then((r) => {
      if (
        r.data.routes &&
        r.data.routes &&
        r.data.routes.length > 0 &&
        r.data.routes[0].geometry &&
        r.data.routes[0].geometry.coordinates
      ) {
        setRouteCoordinates(r.data.routes[0].geometry.coordinates);
      }
    });

    setIsRouted(true);
    fitToCoords(coords);
  };

  return (
    <View style={[globalStyles.cardBigger]}>
      <TouchableOpacity onPress={hideAll}>
        <Feather
          name="x"
          size={24}
          style={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
          color={Colors.PRIMARY}
        />
      </TouchableOpacity>

      <View style={{ paddingHorizontal: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              marginBottom: 8,
              marginLeft: 8,
              fontFamily: "outfit-medium",
            }}
          >
            Dokąd chcesz jechać?
          </Text>
        </View>
        <View
          style={{
            gap: 5,
          }}
        >
          <View>
            {checkFrom && (
              <Feather
                name="x"
                size={24}
                style={{
                  position: "absolute",
                  right: -25,
                  top: 20,
                }}
                color={Colors.PRIMARY}
                onPress={() => clearCheck("from")}
              />
            )}
            <TextInput
              label="Z"
              mode="outlined"
              value={from}
              onChangeText={(from) => {
                if (!checkFrom) {
                  setFrom(from);
                }
              }}
            />
            {type == "from" && (
              <View style={globalStyles.searchListContainer}>
                <FlatList
                  data={searchResult}
                  refreshing={true}
                  renderItem={({ item }) => (
                    <SearchItem
                      item={item}
                      handleCheckPress={handleCheckPress}
                      type="from"
                    />
                  )}
                />
              </View>
            )}
          </View>
          <View>
            <TextInput
              label="Do"
              mode="outlined"
              value={to}
              onChangeText={(to) => {
                if (!checkTo) {
                  setTo(to);
                }
              }}
              style={{ marginBottom: 10 }}
            />
            {checkTo && (
              <Feather
                name="x"
                size={24}
                style={{
                  position: "absolute",
                  right: -25,
                  top: 20,
                }}
                color={Colors.PRIMARY}
                onPress={() => clearCheck("to")}
              />
            )}
            {type == "to" && (
              <View style={globalStyles.searchListContainer2}>
                <FlatList
                  data={searchResult}
                  refreshing={true}
                  renderItem={({ item }) => (
                    <SearchItem
                      handleCheckPress={handleCheckPress}
                      item={item}
                      type="to"
                    />
                  )}
                />
              </View>
            )}
          </View>
          <Button
            mode="contained"
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={getRoute}
          >
            Wyznacz trasę
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CardSearch;
