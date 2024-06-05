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
import { useDispatch, useSelector } from "react-redux";
import { setOtherLayers } from "../../context/redux/reducers/layersSlice";
import { setOtherLocation } from "../../context/redux/reducers/locationSlice";
import CardRide from "./CardRide";
import Entypo from "@expo/vector-icons/Entypo";

const Cards = ({ stopIntervalMain, startIntervalMain }) => {
  const { isSearch, isInfo, isSettings, isRouted } = useSelector(
    (state) => state.root.layers
  );

  const { followGPS, isLocationActive } = useSelector(
    (state) => state.root.location
  );
  const { isRide } = useSelector((state) => state.root.routes);

  const dispatch = useDispatch();

  const handlePressFollow = () => {
    dispatch(setOtherLocation({ data: !followGPS, choice: "follow" }));
  };

  const handlePressLocalization = () => {


    if (isLocationActive) {
      stopIntervalMain();
    } else {
      startIntervalMain();
    }

    dispatch(setOtherLocation({ choice: "locationActive", data: !isLocationActive }));
  };

  const handlePressSearch = () => {
    dispatch(setOtherLayers({ data: !isSearch, choice: "search" }));
    dispatch(setOtherLayers({ data: false, choice: "info" }));
    dispatch(setOtherLayers({ data: false, choice: "settings" }));
  };

  const handlePressSettings = () => {
    dispatch(setOtherLayers({ data: false, choice: "search" }));
    dispatch(setOtherLayers({ data: false, choice: "info" }));
    dispatch(setOtherLayers({ data: !isSettings, choice: "settings" }));
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
          {isLocationActive && (
            <TouchableOpacity onPress={handlePressFollow}>
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

          <TouchableOpacity onPress={handlePressLocalization}>
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
          <TouchableOpacity onPress={handlePressSettings}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: isSettings ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <MaterialIcons
                name="settings"
                size={24}
                color={isSettings ? "white" : Colors.PRIMARY}
              />
            </View>
          </TouchableOpacity>
          {!isRide && (
            <TouchableOpacity onPress={handlePressSearch}>
              <View
                style={[
                  globalStyles.cardButtons,
                  {
                    backgroundColor: isSearch ? Colors.PRIMARY : "white",
                  },
                ]}
              >
                <MaterialIcons
                  name="search"
                  size={24}
                  color={isSearch ? "white" : Colors.PRIMARY}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}

      {isInfo && !isRouted && <CardInfo />}
      {isSettings && !isRouted && <CardSettings />}
      {isSearch && !isRouted && !isRide && <CardSearch />}
      {isRouted && <CardRouted />}
      {isRide && <CardRide />}
    </>
  );
};

export default Cards;
