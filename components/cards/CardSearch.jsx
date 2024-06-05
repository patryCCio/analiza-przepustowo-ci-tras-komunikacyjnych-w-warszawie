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
  setRoutes,
  setStartLocation,
} from "../../context/redux/reducers/routesSlice";
import { setOtherLayers } from "../../context/redux/reducers/layersSlice";
import api from "../../api/api";
import { setOtherLocation } from "../../context/redux/reducers/locationSlice";

const CardSearch = () => {
  const { hideAll, fitToCoords } = useContext(MapContext);

  const [to, setTo] = useState("");
  const [type, setType] = useState(null);

  const [checkTo, setCheckTo] = useState(null);

  const [searchResult, setSearchResult] = useState([]);

  const { getLocation, getRoutesNewData } = useContext(MapContext);

  const dispatch = useDispatch();
  const { isRouted } = useSelector((state) => state.root.layers);
  const { location } = useSelector((state) => state.root.location);
  const { routes } = useSelector((state) => state.root.routes);

  useEffect(() => {
    if (to != "") {
      if (checkTo) {
        setType(null);
        setSearchResult([]);
      } else {
        setType("to");
        checkQueryTo();
      }
    }
  }, [to]);

  const clearCheck = (type) => {
    setCheckTo(null);
    setTo("");
    setType(null);
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
    setTo(item.display_name);
    setCheckTo(item);

    setSearchResult([]);
    setType(null);
  };

  const getRoute = async () => {
    if (to == "" || !checkTo) return;

    let latFrom;
    let longFrom;
    let latTo;
    let longTo;

    if (!location) {
      let dd = await getLocation();
      if (!dd) {
        return;
      } else {
        dispatch(setOtherLocation({ choice: "location", data: dd }));
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

    dispatch(setOtherLocation({choice: "locationActive", data: true}))
    dispatch(setOtherLayers({ choice: "route", data: true }));
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
