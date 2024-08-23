import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { Marker } from "react-native-maps";
import { Colors } from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import { Image, View, Text, StyleSheet } from "react-native";
import MarkerDot from "../../assets/images/pin_primary.png";
import { setCards } from "../../context/redux/reducers/cardsSlice";

const Markers = () => {
  const { fitToCoordsHigher, region, setRegion } = useContext(MapContext);
  const [tileCounts, setTileCounts] = useState([]);
  const [visibleMarkers, setVisibleMarkers] = useState([]);

  const { stops } = useSelector((state) => state.root.data);

  const { setRoutesInfo, setStopInfo } = useContext(MapContext);
  const dispatch = useDispatch();

  const calculateTileCounts = () => {
    let zoomLevel =
      Math.log2(360 / Math.max(region.latitudeDelta, region.longitudeDelta)) +
      1;

    if (zoomLevel >= 15.5) {
      let latitudeMin = region.latitude - region.latitudeDelta / 2;
      let latitudeMax = region.latitude + region.latitudeDelta / 2;
      let longitudeMin = region.longitude - region.longitudeDelta / 2;
      let longitudeMax = region.longitude + region.longitudeDelta / 2;

      const filteredMarkers = stops.filter(
        (marker) =>
          marker.latitude >= latitudeMin &&
          marker.latitude <= latitudeMax &&
          marker.longitude >= longitudeMin &&
          marker.longitude <= longitudeMax
      );
      setVisibleMarkers(filteredMarkers);
      setTileCounts([]);
    } else {
      let tileWidth, tileHeight, rows, cols;

      if (zoomLevel >= 12) {
        rows = 4;
        cols = 4;
      } else if (zoomLevel >= 11.5) {
        rows = 4;
        cols = 3;
      } else if (zoomLevel >= 10) {
        rows = 3;
        cols = 3;
      } else if (zoomLevel >= 9.5) {
        rows = 2;
        cols = 2;
      } else {
        rows = 1;
        cols = 1;
      }

      tileWidth = region.longitudeDelta / cols;
      tileHeight = region.latitudeDelta / rows;

      let tileData = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const longitudeMin =
            region.longitude - region.longitudeDelta / 2 + col * tileWidth;
          const longitudeMax = longitudeMin + tileWidth;
          const latitudeMin =
            region.latitude - region.latitudeDelta / 2 + row * tileHeight;
          const latitudeMax = latitudeMin + tileHeight;

          let avgLong = 0;
          let avgLat = 0;
          let count = 0;
          stops.forEach((marker) => {
            if (
              marker.latitude >= latitudeMin &&
              marker.latitude <= latitudeMax &&
              marker.longitude >= longitudeMin &&
              marker.longitude <= longitudeMax
            ) {
              count++;
              avgLong += parseFloat(marker.longitude);
              avgLat += parseFloat(marker.latitude);
            }
          });

          tileData.push({
            latitude: avgLat / count,
            longitude: avgLong / count,
            count: count,
          });
        }
      }

      setTileCounts(tileData);
      setVisibleMarkers([]);
    }
  };

  useEffect(() => {
    calculateTileCounts();
  }, [region]);

  const showInfo = async (marker) => {
    try {
      const result = await api.get("stops/vehicles/" + marker.id);
      setRoutesInfo(result.data);
    } catch (err) {
      console.log(err);
    }

    setStopInfo(marker);

    dispatch(setCards({ choice: "all", data: false }));
    dispatch(setCards({ choice: "stopCard", data: true }));

    fitToCoordsHigher({
      latitude: marker.latitude,
      longitude: marker.longitude,
    });
  };

  const increaseZoomLevel = (e, tile) => {
    e.stopPropagation();

    const newLatitudeDelta = region.latitudeDelta - 0.05;
    const newLongitudeDelta = region.longitudeDelta - 0.05;

    setRegion({
      latitude: tile.latitude,
      longitude: tile.longitude,
      latitudeDelta: newLatitudeDelta,
      longitudeDelta: newLongitudeDelta,
    });
  };

  return (
    <>
      {visibleMarkers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: parseFloat(marker.latitude),
            longitude: parseFloat(marker.longitude),
          }}
          onPress={(e) => {
            showInfo(marker);
          }}
        >
          <View>
            <Image source={MarkerDot} style={{ width: 24, height: 24 }} />
          </View>
        </Marker>
      ))}

      {tileCounts.map((tile, index) => {
        if (tile.count != 0) {
          let dotStyle;
          if (tile.count == 1) {
            dotStyle = styles.dot_1;
          } else if (tile.count > 1 && tile.count <= 5) {
            dotStyle = styles.dot_2;
          } else if (tile.count > 5 && tile.count <= 10) {
            dotStyle = styles.dot_3;
          } else if (tile.count > 10 && tile.count <= 20) {
            dotStyle = styles.dot_4;
          } else if (tile.count > 20 && tile.count <= 50) {
            dotStyle = styles.dot_5;
          } else if (tile.count > 50 && tile.count <= 100) {
            dotStyle = styles.dot_6;
          } else if (tile.count > 100 && tile.count <= 150) {
            dotStyle = styles.dot_7;
          } else if (tile.count > 150 && tile.count <= 200) {
            dotStyle = styles.dot_8;
          } else if (tile.count > 200 && tile.count <= 300) {
            dotStyle = styles.dot_9;
          } else if (tile.count > 300 && tile.count <= 400) {
            dotStyle = styles.dot_10;
          } else if (tile.count > 400 && tile.count <= 500) {
            dotStyle = styles.dot_11;
          } else if (tile.count > 500 && tile.count <= 600) {
            dotStyle = styles.dot_12;
          } else if (tile.count > 600 && tile.count <= 700) {
            dotStyle = styles.dot_13;
          } else if (tile.count > 700 && tile.count <= 800) {
            dotStyle = styles.dot_14;
          } else if (tile.count > 800 && tile.count <= 900) {
            dotStyle = styles.dot_15;
          } else if (tile.count > 900 && tile.count <= 1000) {
            dotStyle = styles.dot_16;
          } else if (tile.count > 1000 && tile.count <= 1100) {
            dotStyle = styles.dot_17;
          } else if (tile.count > 1100 && tile.count <= 1200) {
            dotStyle = styles.dot_18;
          } else if (tile.count > 1200 && tile.count <= 1300) {
            dotStyle = styles.dot_19;
          } else if (tile.count > 1300 && tile.count <= 1400) {
            dotStyle = styles.dot_20;
          } else if (tile.count > 1400 && tile.count <= 1500) {
            dotStyle = styles.dot_21;
          } else if (tile.count > 1500 && tile.count <= 1600) {
            dotStyle = styles.dot_22;
          } else if (tile.count > 1600 && tile.count <= 1700) {
            dotStyle = styles.dot_23;
          } else if (tile.count > 1700 && tile.count <= 1800) {
            dotStyle = styles.dot_24;
          } else if (tile.count > 1800 && tile.count <= 1900) {
            dotStyle = styles.dot_25;
          } else if (tile.count > 1900 && tile.count <= 2000) {
            dotStyle = styles.dot_26;
          } else if (tile.count > 2000 && tile.count <= 2500) {
            dotStyle = styles.dot_27;
          } else if (tile.count > 2500 && tile.count <= 3000) {
            dotStyle = styles.dot_28;
          } else if (tile.count > 3000 && tile.count <= 3500) {
            dotStyle = styles.dot_29;
          } else if (tile.count > 3500 && tile.count <= 4000) {
            dotStyle = styles.dot_30;
          } else if (tile.count > 4000 && tile.count <= 5000) {
            dotStyle = styles.dot_31;
          } else if (tile.count > 5000 && tile.count <= 6000) {
            dotStyle = styles.dot_32;
          } else {
            dotStyle = styles.dot_33;
          }

          return (
            <Marker
              key={index}
              coordinate={{
                latitude: tile.latitude,
                longitude: tile.longitude,
              }}
              stopPropagation={true}
              onPress={(e) => {
                e.stopPropagation();
                increaseZoomLevel(e, tile);
              }}
              tracksViewChanges={false}
            >
              <View
                style={[
                  {
                    backgroundColor: Colors.PRIMARY,
                    padding: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: Colors.SECOND,
                  },
                  dotStyle,
                ]}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    fontFamily: "outfit-medium",
                  }}
                >
                  {tile.count}
                </Text>
              </View>
            </Marker>
          );
        }
      })}
    </>
  );
};

const styles = StyleSheet.create({
  dot_1: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 0,
  },
  dot_2: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    borderWidth: 0,
  },
  dot_3: {
    width: 29,
    height: 29,
    borderRadius: 14.5,
    borderWidth: 0,
  },
  dot_4: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
  },
  dot_5: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    borderWidth: 2,
  },
  dot_6: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
  },
  dot_7: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
  },
  dot_8: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
  },
  dot_9: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
  },
  dot_10: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
  },
  dot_11: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
  },
  dot_12: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
  },
  dot_13: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
  },
  dot_14: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
  },
  dot_15: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
  },
  dot_16: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
  },
  dot_17: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
  },
  dot_18: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 4,
  },
  dot_19: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
  },
  dot_20: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 4,
  },
  dot_21: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
  },
  dot_22: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 4,
  },
  dot_23: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
  },
  dot_24: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
  },
  dot_25: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 6,
  },
  dot_26: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 6,
  },
  dot_27: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
  },
  dot_28: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 6,
  },
  dot_29: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 6,
  },
  dot_30: {
    width: 98,
    height: 98,
    borderRadius: 49,
    borderWidth: 8,
  },
  dot_31: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 8,
  },
  dot_32: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 8,
  },
  dot_33: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 10,
  },
});

export default Markers;
