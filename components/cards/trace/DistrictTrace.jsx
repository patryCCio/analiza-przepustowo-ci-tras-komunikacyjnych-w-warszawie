import { useContext, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Polyline, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../constants/Colors";

import pin_pink from "../../../assets/images/pin_pink.png";
import pin_black from "../../../assets/images/pin_black.png";
import pin_gold from "../../../assets/images/pin_gold.png";
import pin_gray from "../../../assets/images/pin_gray.png";
import pin_green from "../../../assets/images/pin_green.png";
import pin_orange from "../../../assets/images/pin_orange.png";
import pin_primary from "../../../assets/images/pin_primary.png";
import pin_royalblue from "../../../assets/images/pin_royalblue.png";
import { setCards } from "../../../context/redux/reducers/cardsSlice";
import { isCoordinateInRegion } from "../../../context/redux/functions";
import { MapContext } from "../../../context/MapContext";

const pins = {
  Bemowo: pin_gold,
  Wesoła: pin_gold,
  Śródmieście: pin_gold,
  Wawer: pin_orange,
  Ochota: pin_orange,
  Żoliborz: pin_orange,
  Wola: pin_royalblue,
  "Praga-Południe": pin_royalblue,
  Bielany: pin_black,
  "Praga-Północ": pin_black,
  Wilanów: pin_gray,
  Targówek: pin_gray,
  Włochy: pin_gray,
  Białołęka: pin_pink,
  Ursus: pin_pink,
  Mokotów: pin_pink,
  Rembertów: pin_green,
  Ursynów: pin_green,
  "Poza Warszawą": pin_primary,
};

const districtColors = {
  Bemowo: "gold",
  Wesoła: "gold",
  Śródmieście: "gold",
  Wawer: "orangered",
  Ochota: "orangered",
  Żoliborz: "orangered",
  Wola: "royalblue",
  "Praga-Południe": "royalblue",
  Bielany: "black",
  "Praga-Północ": "black",
  Wilanów: "gray",
  Targówek: "gray",
  Włochy: "gray",
  Białołęka: "pink",
  Ursus: "pink",
  Mokotów: "pink",
  Rembertów: "#008000",
  Ursynów: "#008000",
  "Poza Warszawą": Colors.PRIMARY,
};

const DistrictTrace = () => {
  const { vehicles, stops } = useSelector((state) => state.root.data);

  const { region } = useContext(MapContext);

  const [segments, setSegments] = useState([]);
  const [allStops, setAllStops] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (vehicles.length > 0) {
      const allSegments = [];

      const stopsArray = [];
      vehicles.forEach((el) => {
        if (el.is_active && el.traces) {
          el.traces.forEach((el2) => {
            if (el2.routes && el2.coords) {
              const nameF = el2.coords.coordinates[0].name;
              const nameL =
                el2.coords.coordinates[el2.coords.coordinates.length - 1].name;

              el2.routes.forEach((el3) => {
                if (el3.order == 0 || el3.order == el2.routes.length - 1)
                  stops.forEach((stopp) => {
                    if (stopp.id == el3.stop_id) {
                      stopsArray.push({
                        route: el.route,
                        stop_from: el2.stop_from,
                        stop_end: el2.stop_end,
                        ...stopp,
                        order: el3.order,
                        name_district: el3.order == 0 ? nameF : nameL,
                      });
                    }
                  });
              });
            }
          });
        }
      });

      setAllStops(stopsArray);

      vehicles.forEach((el) => {
        if (el.is_active && el.traces) {
          el.traces.forEach((el2) => {
            if (el2.is_active && el2.coords) {
              const coords = el2.coords.coordinates;

              let currentSegment = {
                coords: [coords[0]],
                name: coords[0].name,
              };

              for (let i = 1; i < coords.length; i++) {
                const currentPoint = coords[i];
                const previousPoint = coords[i - 1];

                if (currentPoint.name !== previousPoint.name) {
                  allSegments.push(currentSegment);
                  currentSegment = {
                    coords: [previousPoint, currentPoint],
                    name: currentPoint.name,
                  };
                } else {
                  currentSegment.coords.push(currentPoint);
                }
              }
              allSegments.push(currentSegment);
            }
          });
        }
      });

      setSegments(allSegments);
    }
  }, [vehicles]);

  const handlePress = (vehicle_id, trace_id) => {
    let result;

    vehicles.forEach((el) => {
      if (el.id == vehicle_id) {
        el.traces.forEach((el2) => {
          if (el2.id == trace_id) {
            result = {
              ...el,
              traces: {
                ...el2,
              },
            };
          }
        });
      }
    });

    setTraceInfo(result);
    dispatch(setCards({ choice: "all", data: false }));
    dispatch(setCards({ choice: "ztmCardInfo", data: true }));
  };

  return (
    <View>
      {segments.map((segment, index) => {
        const array = segment.coords.filter((el) => {
          if (region && isCoordinateInRegion(el, region)) {
            return el;
          }
        });

        return (
          <View key={`${segment.name}-${index}`}>
            <Polyline
              coordinates={array}
              strokeColor={districtColors[segment.name] || "gray"}
              strokeWidth={2}
              tappable={true}
            />
          </View>
        );
      })}

      {allStops.map((el) => {
        if (region && isCoordinateInRegion(el, region)) {
          const title = el.route + " | " + el.name + " " + el.number_of_stop;

          let description = "";

          if (el.order == 0) {
            description = "do " + el.stop_end;
          } else {
            description = "Przystanek końcowy!";
          }

          return (
            <Marker
              key={el.route + "-" + el.stop_from + "-" + el.order}
              coordinate={{
                latitude: parseFloat(el.latitude),
                longitude: parseFloat(el.longitude),
              }}
              title={title}
              description={description}
            >
              <View>
                <Image
                  style={{ width: 32, height: 32 }}
                  source={pins[el.name_district]}
                />
              </View>
            </Marker>
          );
        }
      })}
    </View>
  );
};

export default DistrictTrace;
