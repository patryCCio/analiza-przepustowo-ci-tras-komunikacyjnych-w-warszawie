import { MaterialIcons } from "@expo/vector-icons";
import CardInfo from "./CardInfo";
import { View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../constants/Globals";
import { Colors } from "../../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import CardSettings from "./CardSettings";
import CardSearch from "./CardSearch";
import CardRouted from "./CardRouted";

const Cards = () => {
  const {
    isVisibleSearch,
    isVisibleSettings,
    isVisibleInfo,
    setIsVisibleSearch,
    setIsVisibleSettings,
    setIsVisibleInfo,
    isRouted,
    wantToShareLocation,
    setWantToShareLocation,
    location,
    fitToCoordsHigher,
    setFollowLocation,
    followLocation,
  } = useContext(MapContext);

  const handlePressLocalization = () => {
    setIsVisibleSearch(false);
    setIsVisibleInfo(false);
    setIsVisibleSettings(false);
    setFollowLocation(!followLocation);

    if (!wantToShareLocation) {
      setWantToShareLocation(true);
    }
  };

  const handlePressSearch = () => {
    setIsVisibleSearch(!isVisibleSearch);
    setIsVisibleInfo(false);
    setIsVisibleSettings(false);
  };

  const handlePressSettings = () => {
    setIsVisibleSearch(false);
    setIsVisibleInfo(false);
    setIsVisibleSettings(!isVisibleSettings);
  };

  return (
    <>
      {!isRouted && (
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
          <TouchableOpacity onPress={handlePressLocalization}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: followLocation ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <MaterialIcons
                name="location-searching"
                size={24}
                color={followLocation ? "white" : Colors.PRIMARY}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressSettings}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: isVisibleSettings ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <MaterialIcons
                name="settings"
                size={24}
                color={isVisibleSettings ? "white" : Colors.PRIMARY}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressSearch}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: isVisibleSearch ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <MaterialIcons
                name="search"
                size={24}
                color={isVisibleSearch ? "white" : Colors.PRIMARY}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {isVisibleInfo && !isRouted && <CardInfo />}
      {isVisibleSettings && !isRouted && <CardSettings />}
      {isVisibleSearch && !isRouted && <CardSearch />}
      {isRouted && <CardRouted />}
    </>
  );
};

export default Cards;
