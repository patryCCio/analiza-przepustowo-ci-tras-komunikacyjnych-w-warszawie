import { globalStyles } from "../../constants/Globals";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { Button, TextInput } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import axios from "axios";
import SearchItem from "./SearchItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndLocation,
  setStartLocation,
} from "../../context/redux/reducers/routesSlice";
import { setOtherLocation } from "../../context/redux/reducers/locationSlice";

const CardSearch = ({ hideAll }) => {
  const [to, setTo] = useState("");
  const [checkTo, setCheckTo] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const { getLocation, getRoutesNewData, fitToCoords } = useContext(MapContext);

  const dispatch = useDispatch();
  const { location } = useSelector((state) => state.root.location);

  useEffect(() => {
    if (to != "") {
      if (checkTo) {
        setSearchResult([]);
      } else {
        checkQueryTo();
      }
    }
  }, [to]);

  const clearCheck = (type) => {
    setCheckTo(null);
    setTo("");
  };

  const checkQueryTo = async () => {
    if (to == "") return;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${to}&addressdetails=1&countrycodes=pl`;
    const data = await axios.get(nominatimUrl);
    if (data.data) {
      setSearchResult(data.data);
    }
  };

  const handleCheckPress = (item, type) => {
    setTo(item.display_name);
    setCheckTo(item);

    setSearchResult([]);
  };

  const getRoute = async () => {
    if (to == "" || !checkTo) return;

    let latFrom;
    let longFrom;
    let latTo;
    let longTo;

    if (!location) {
      dispatch(setOtherLocation({ choice: "locationActive", data: true }));
      let dd = await getLocation();
      if (!dd) {
        return;
      } else {
        dispatch(setOtherLocation({ choice: "location", data: dd }));
        dispatch(setOtherLocation({ choice: "locationActive", data: true }));
        latFrom = parseFloat(dd.coords.latitude);
        longFrom = parseFloat(dd.coords.longitude);
      }
    } else {
      latFrom = parseFloat(location.coords.latitude);
      longFrom = parseFloat(location.coords.longitude);
    }
    latTo = parseFloat(checkTo.lat);
    longTo = parseFloat(checkTo.lon);

    dispatch(setStartLocation({ longitude: longFrom, latitude: latFrom }));
    dispatch(setEndLocation({ longitude: longTo, latitude: latTo }));


    const coords = [
      { longitude: longFrom, latitude: latFrom },
      { longitude: longTo, latitude: latTo },
    ];

    getRoutesNewData(dispatch, coords);

    dispatch(setOtherLocation({ choice: "locationActive", data: true }));
    dispatch(setOtherLocation({ choice: "routed", data: true }));
    fitToCoords(coords);
  };

  return (
    <View
      style={to.length > 0 ? globalStyles.cardBiggest : globalStyles.cardBigger}
    >
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

      {to.length > 0 && (
        <View style={globalStyles.searchListContainer2}>
          <FlatList
            data={searchResult}
            refreshing={true}
            renderItem={({ item }) => (
              <SearchItem handleCheckPress={handleCheckPress} item={item} />
            )}
          />
        </View>
      )}

      <View style={{ paddingHorizontal: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10,
            marginBottom: 4,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              marginHorizontal: 8,
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
          </View>
          {checkTo && (
            <Button
              mode="contained"
              style={{ backgroundColor: Colors.PRIMARY }}
              onPress={getRoute}
            >
              Wyznacz trasę
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardSearch;
