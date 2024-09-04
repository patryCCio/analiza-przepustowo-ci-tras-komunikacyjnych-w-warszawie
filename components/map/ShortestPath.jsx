import { useContext, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { MapContext } from "../../context/MapContext";
import { Marker, Polyline } from "react-native-maps";

const color = {
  Autobus: Colors.PRIMARY,
  Tramwaj: "tomato",
  Pociąg: "green",
  Pieszo: "orange",
};

const ShortestPath = () => {
  const {
    shortestPathArray,
    showShortestMarker,
    showShortestTrace,
    actualShortest,
    walk,
    walkCoords,
  } = useContext(MapContext);

  return (
    <>
      {showShortestTrace &&
        shortestPathArray.length > 0 &&
        shortestPathArray.map((elz, i) => {
          if (i == actualShortest) {
            return elz.arr.map((el, index) => {
              return (
                <Polyline
                  coordinates={el.coordinates}
                  strokeWidth={2}
                  strokeColor={color[el.type]}
                  key={el.type + "-TRASA-" + index}
                />
              );
            });
          }
        })}

      {walk && (
        <>
          <Marker
            pinColor={color["Pieszo"]}
            coordinate={{
              longitude: walkCoords.fromLon,
              latitude: walkCoords.fromLat,
            }}
            title="Start"
            key={"PIESZO-START"}
          />

          <Marker
            pinColor={color["Pieszo"]}
            coordinate={{
              longitude: walkCoords.toLon,
              latitude: walkCoords.toLat,
            }}
            key={"PIESZO-KONIEC"}
            title="Koniec"
          />
        </>
      )}

      {showShortestMarker &&
        shortestPathArray.length > 0 &&
        shortestPathArray.map((elz, i) => {
          if (actualShortest == i) {
            return elz.arr.map((el, index) => {
              if (el.type != "Pieszo") {
                return el.data.map((el2, index2) => {
                  return (
                    <Marker
                      pinColor={color[el.type]}
                      title={
                        el2.stop_name + " " + el2.number_of_stop + "|" + el2.route
                      }
                      key={el.type + "-PRZYSTANEK-" + index + "-" + index2}
                      coordinate={{
                        longitude: parseFloat(el2.longitude),
                        latitude: parseFloat(el2.latitude),
                      }}
                    />
                  );
                })
                
              }
            });
          }
        })}
    </>
  );
};

export default ShortestPath;
