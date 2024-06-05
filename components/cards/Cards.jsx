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

const Cards = ({ startIntervalMain, stopInterval, startInterval }) => {
  const { fitToCoordsHigher } = useContext(MapContext);

  const { isSearch, isInfo, isSettings, isRouted } = useSelector(
    (state) => state.root.layers
  );

  const { followGPS, wantToShareLocation, location } = useSelector(
    (state) => state.root.location
  );
  const { isRide } = useSelector((state) => state.root.routes);

  const dispatch = useDispatch();

  const handlePressLocalization = () => {
    dispatch(setOtherLayers({ data: false, choice: "search" }));
    dispatch(setOtherLayers({ data: false, choice: "info" }));
    dispatch(setOtherLayers({ data: false, choice: "settings" }));
    startIntervalMain();

    if (!wantToShareLocation) {
      dispatch(setOtherLocation({ choice: "share", data: true }));
      dispatch(setOtherLocation({ choice: "follow", data: true }));
    } else {
      if (!followGPS && location) {
        fitToCoordsHigher({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }

      dispatch(setOtherLocation({ choice: "follow", data: !followGPS }));
    }
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
          <TouchableOpacity onPress={handlePressLocalization}>
            <View
              style={[
                globalStyles.cardButtons,
                {
                  backgroundColor: followGPS ? Colors.PRIMARY : "white",
                },
              ]}
            >
              <MaterialIcons
                name="location-searching"
                size={24}
                color={followGPS ? "white" : Colors.PRIMARY}
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
      {isRouted && <CardRouted startInterval={startInterval} />}
      {isRide && <CardRide stopInterval={stopInterval} />}
    </>
  );
};

export default Cards;
