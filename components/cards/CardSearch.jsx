import { globalStyles } from "../../constants/Globals";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { Button } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import api from "../../api/api";
import OptionsSearch from "./search/OptionsSearch";
import Dots from "./search/Dots";
import ToSearch from "./search/ToSearch";
import FromSearch from "./search/FromSearch";
import CheckS from "./search/CheckS";
import CheckL from "./search/CheckL";
import CheckTrace from "./search/CheckTrace";

const CardSearch = () => {
  const [checkTo, setCheckTo] = useState(null);
  const [checkFrom, setCheckFrom] = useState(null);

  const [searchResult, setSearchResult] = useState([]);

  const { getLocation, hideAll } = useContext(MapContext);

  const [searchOption, setSearchOption] = useState(false);
  const [localizationOption, setLocalizationOption] = useState(true);

  const [actualIndex, setActualIndex] = useState(0);

  const [text, setText] = useState("");

  useEffect(() => {
    checkQuery();
  }, [text]);

  useEffect(() => {
    if (searchResult.length > 0) {
    }
  }, [searchResult]);

  const checkQuery = async () => {
    if (text == "") {
      setSearchResult([]);
    }

    if (text == "") return;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${text}&addressdetails=1&countrycodes=pl`;
    const data = await api.get(nominatimUrl);
    if (data.data) {
      setSearchResult(data.data);
    }
  };

  const handleCheckPress = (item, type) => {
    if (type == "to") {
      setCheckTo(item);
    } else {
      setCheckFrom(item);
    }
    setText("");
  };

  const checkMove = (type) => {
    if (type == "next") {
      if (localizationOption) {
        if (actualIndex == 1) {
          if (checkTo) {
            setActualIndex((prevState) => prevState + 1);
          }
        } else {
          setActualIndex((prevState) => prevState + 1);
        }
      }

      if (searchOption) {
        if (actualIndex == 1) {
          if (checkFrom) {
            setActualIndex((prevState) => prevState + 1);
          }
        } else if (actualIndex == 2) {
          if (checkTo) {
            setActualIndex((prevState) => prevState + 1);
          }
        } else {
          setActualIndex((prevState) => prevState + 1);
        }
      }
    } else {
      setActualIndex((prevState) => prevState - 1);
    }
  };

  const searchForTraces = async () => {
    if (localizationOption) {
      const res = await getLocation();

      if (res == null) return;

      const { longitude, latitude } = res.coords;
      const string =
        longitude + "," + latitude + ";" + checkTo.lon + "," + checkTo.lat;
    } else {
      const string =
        checkFrom.lon +
        "," +
        checkFrom.lat +
        ";" +
        checkTo.lon +
        "," +
        checkTo.lat;
    }
  };

  return (
    <View
      style={
        checkFrom || checkTo
          ? globalStyles.cardBiggest
          : globalStyles.cardBigger
      }
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

      <Dots localizationOption={localizationOption} actualIndex={actualIndex} />

      {actualIndex == 0 && (
        <OptionsSearch
          setLocalizationOption={setLocalizationOption}
          localizationOption={localizationOption}
          setSearchOption={setSearchOption}
          searchOption={searchOption}
        />
      )}

      {localizationOption && actualIndex == 1 && searchResult.length > 0 && (
        <CheckTrace
          setText={setText}
          handleCheckPress={handleCheckPress}
          setSearchResult={setSearchResult}
          type={"to"}
          searchResult={searchResult}
          checkFrom={checkFrom}
          checkTo={checkTo}
        />
      )}
      {searchOption && actualIndex == 1 && searchResult.length > 0 && (
        <CheckTrace
          setText={setText}
          handleCheckPress={handleCheckPress}
          setSearchResult={setSearchResult}
          type={"from"}
          searchResult={searchResult}
          checkFrom={checkFrom}
          checkTo={checkTo}
        />
      )}
      {searchOption && actualIndex == 2 && searchResult.length > 0 && (
        <CheckTrace
          setText={setText}
          handleCheckPress={handleCheckPress}
          setSearchResult={setSearchResult}
          type={"to"}
          searchResult={searchResult}
          checkFrom={checkFrom}
          checkTo={checkTo}
        />
      )}

      {localizationOption && actualIndex == 1 && (
        <ToSearch check={checkTo} text={text} setText={setText} />
      )}

      {searchOption && actualIndex == 1 && (
        <FromSearch check={checkFrom} text={text} setText={setText} />
      )}

      {searchOption && actualIndex == 2 && (
        <ToSearch check={checkTo} text={text} setText={setText} />
      )}

      {checkTo && localizationOption && actualIndex == 1 && (
        <View style={{ marginBottom: 20, gap: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: "outfit-medium" }}>
            Zaznaczony
          </Text>
          <Text style={{ fontFamily: "outfit", textAlign: "justify" }}>
            {checkTo.display_name}
          </Text>
        </View>
      )}

      {checkFrom && searchOption && actualIndex == 1 && (
        <View style={{ marginBottom: 20, gap: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: "outfit-medium" }}>
            Zaznaczony
          </Text>
          <Text style={{ fontFamily: "outfit", textAlign: "justify" }}>
            {checkFrom.display_name}
          </Text>
        </View>
      )}

      {checkTo && searchOption && actualIndex == 2 && (
        <View style={{ marginBottom: 20, gap: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: "outfit-medium" }}>
            Zaznaczony
          </Text>
          <Text style={{ fontFamily: "outfit", textAlign: "justify" }}>
            {checkTo.display_name}
          </Text>
        </View>
      )}

      {searchOption && actualIndex == 3 && (
        <CheckS checkFrom={checkFrom} checkTo={checkTo} />
      )}

      {localizationOption && actualIndex == 2 && <CheckL checkTo={checkTo} />}

      <View
        style={{
          flexDirection: "row",
          gap: 15,
          justifyContent: "center",
        }}
      >
        {actualIndex > 0 && (
          <Button
            mode="outlined"
            onPress={() => checkMove("back")}
            textColor={Colors.SECOND}
            style={{ width: 100, borderColor: Colors.SECOND }}
          >
            Wstecz
          </Button>
        )}

        {localizationOption && actualIndex < 2 && (
          <Button
            mode="outlined"
            onPress={() => checkMove("next")}
            textColor={Colors.SECOND}
            style={{ width: 100, borderColor: Colors.SECOND }}
          >
            Dalej
          </Button>
        )}

        {searchOption && actualIndex < 3 && (
          <Button
            mode="outlined"
            onPress={() => checkMove("next")}
            textColor={Colors.SECOND}
            style={{ width: 100, borderColor: Colors.SECOND }}
          >
            Dalej
          </Button>
        )}

        {localizationOption && actualIndex == 2 && (
          <Button
            mode="outlined"
            icon={"google-analytics"}
            onPress={searchForTraces}
            textColor={Colors.SECOND}
            style={{ width: 120, borderColor: Colors.SECOND }}
          >
            Szukaj
          </Button>
        )}

        {searchOption && actualIndex == 3 && (
          <Button
            mode="outlined"
            icon={"google-analytics"}
            onPress={searchForTraces}
            textColor={Colors.SECOND}
            style={{ width: 120, borderColor: Colors.SECOND }}
          >
            Szukaj
          </Button>
        )}
      </View>
    </View>
  );
};

export default CardSearch;
