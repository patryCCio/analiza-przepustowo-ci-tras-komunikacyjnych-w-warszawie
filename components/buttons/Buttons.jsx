import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../constants/Globals";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { setButtons } from "../../context/redux/reducers/buttonsSlice";
import { setCards } from "../../context/redux/reducers/cardsSlice";
import { setOtherLocation } from "../../context/redux/reducers/locationSlice";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Buttons = () => {
  const { isLocationActive, followGPS } = useSelector(
    (state) => state.root.location
  );

  const {
    gpsButton,
    gpsTrack,
    settingsButton,
    searchButton,
    ztmButton,
    colorsButton,
  } = useSelector((state) => state.root.buttons);
  const {
    settingsCard,
    searchCard,
    ztmCard,
    colorsCard,
    shortestPathCard,
    shortestPathCardArray,
  } = useSelector((state) => state.root.cards);
  const { stopIntervalMain, startIntervalMain, shortestPathArray } =
    useContext(MapContext);

  const { isRouteZTMMap } = useSelector((state) => state.root.settings);

  const dispatch = useDispatch();

  const names = [
    "settingsCard",
    "searchCard",
    "ztmCard",
    "colorsCard",
    "shortestPathCard",
    "shortestPathCardArray",
  ];

  const handlePress = (name) => {
    if (name != "colorsButton" && isRouteZTMMap) {
      dispatch(setButtons({ choice: "colorsButton", data: true }));
    }

    if (name == "settingsCard") {
      dispatch(setCards({ choice: name, data: !settingsCard }));
    } else if (name == "searchCard") {
      dispatch(setCards({ choice: name, data: !searchCard }));
    } else if (name == "ztmCard") {
      dispatch(setCards({ choice: name, data: !ztmCard }));
    } else if (name == "shortestPathCard") {
      dispatch(setCards({ choice: name, data: !shortestPathCard }));
    } else if (name == "shortestPathCardArray") {
      dispatch(setCards({ choice: name, data: !shortestPathCardArray }));
    } else if (name == "colorsButton") {
      dispatch(setButtons({ choice: name, data: false }));
      dispatch(setCards({ choice: "colorsCard", data: true }));
    }

    names.forEach((el) => {
      if (el != name) {
        dispatch(setCards({ choice: el, data: false }));
      }
    });
  };

  const handlePressGPS = () => {
    if (isLocationActive) {
      dispatch(setOtherLocation({ choice: "follow", data: false }));
      stopIntervalMain();
    } else {
      startIntervalMain();
    }

    dispatch(setButtons({ choice: "gpsTrack", data: !isLocationActive }));
    dispatch(
      setOtherLocation({ choice: "locationActive", data: !isLocationActive })
    );
  };

  const handlePressGPSTrack = () => {
    dispatch(setOtherLocation({ choice: "follow", data: !followGPS }));
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          position: "absolute",
          bottom: 30,
          gap: 30,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {gpsTrack && (
          <TouchableOpacity onPress={handlePressGPSTrack}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: followGPS ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <Entypo
                name="location-pin"
                size={24}
                color={followGPS ? "white" : Colors.PRIMARY}
              />
            </View>
          </TouchableOpacity>
        )}

        {gpsButton && (
          <TouchableOpacity onPress={handlePressGPS}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: isLocationActive ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <MaterialIcons
                name="location-searching"
                size={24}
                color={isLocationActive ? "white" : Colors.PRIMARY}
              />
            </View>
          </TouchableOpacity>
        )}

        {settingsButton && (
          <TouchableOpacity onPress={() => handlePress("settingsCard")}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: settingsCard ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <MaterialIcons
                name="settings"
                size={24}
                color={settingsCard ? "white" : Colors.PRIMARY}
              />
            </View>
          </TouchableOpacity>
        )}

        {searchButton && (
          <TouchableOpacity onPress={() => handlePress("searchCard")}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: searchCard ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <MaterialIcons
                name="search"
                size={24}
                color={searchCard ? "white" : Colors.PRIMARY}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {shortestPathArray.length > 0 && (
        <View
          style={{
            position: "absolute",
            width: 63,
            height: 63,
            top: 80,
            right: 100,
            borderRadius: 20,
            backgroundColor: shortestPathCard ? Colors.PRIMARY : "white",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            zIndex: 210,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <TouchableOpacity onPress={() => handlePress("shortestPathCard")}>
            <FontAwesome
              name="info"
              size={34}
              color={shortestPathCard ? "white" : Colors.PRIMARY}
            />
          </TouchableOpacity>
        </View>
      )}

      {shortestPathArray.length > 0 && (
        <View
          style={{
            position: "absolute",
            width: 80,
            height: 63,
            top: 80,
            right: 180,
            borderRadius: 20,
            backgroundColor: shortestPathCardArray ? Colors.PRIMARY : "white",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            zIndex: 210,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => handlePress("shortestPathCardArray")}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                color: shortestPathCardArray ? "white" : Colors.PRIMARY,
              }}
            >
              Trasy
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {ztmButton && (
        <View
          style={{
            position: "absolute",
            width: 63,
            height: 63,
            top: 80,
            right: 20,
            borderRadius: 20,
            backgroundColor: ztmCard ? Colors.PRIMARY : "white",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            shadowColor: "#000",
            zIndex: 210,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <TouchableOpacity onPress={() => handlePress("ztmCard")}>
            <MaterialIcons
              name="alt-route"
              size={34}
              color={ztmCard ? "white" : Colors.PRIMARY}
            />
          </TouchableOpacity>
        </View>
      )}

      {colorsButton && (
        <View
          style={{
            position: "absolute",
            width: 63,
            height: 63,
            top: 160,
            right: 20,
            borderRadius: 20,
            backgroundColor: colorsCard ? Colors.PRIMARY : "white",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            shadowColor: "#000",
            zIndex: 210,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <TouchableOpacity onPress={() => handlePress("colorsButton")}>
            <Ionicons
              name="layers"
              size={34}
              color={colorsCard ? "white" : Colors.PRIMARY}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Buttons;
