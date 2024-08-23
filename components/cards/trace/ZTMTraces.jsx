import { Marker, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../../context/MapContext";
import { setCards } from "../../../context/redux/reducers/cardsSlice";
import { isCoordinateInRegion } from "../../../context/redux/functions";

const ZTMTraces = () => {
  const { vehicles, stops } = useSelector((state) => state.root.data);
  const { showStopsNormal } = useSelector((state) => state.root.settings);
  const [stopMarkers, setStopMarkers] = useState([]);
  const { setTraceInfo, region } = useContext(MapContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const array = [];

    vehicles.forEach((el) => {
      if (el.is_active && el.traces) {
        el.traces.forEach((el2) => {
          if (el2.is_active && el2.routes) {
            el2.routes.forEach((el3, index2) => {
              let start = false;
              let end = false;
              if (el.order == 0) {
                start = true;
              }

              if (el.order == el2.routes.length - 1) {
                end = true;
              }

              array.push({
                ...el3,
                type: el.type,
                route: el.route,
                stop_from: el2.stop_from,
                stop_end: el2.stop_end,
                start,
                end,
              });
            });
          }
        });
      }
    });

    const array2 = [];

    array.forEach((el) => {
      stops.forEach((el2) => {
        if (el2.id == el.stop_id) {
          array2.push({
            ...el,
            ...el2,
            longitude: parseFloat(el2.longitude),
            latitude: parseFloat(el2.latitude),
          });
        }
      });
    });

    setStopMarkers(array2);
  }, [vehicles]);

  let index = -1;

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
    <>
      {vehicles.map((el) => {
        if (el.traces && el.is_active) {
          let traceI = -1;

          if (el.type == "Tramwaj") {
            return el.traces.map((el2) => {
              if (el2.routes && el2.coords && el2.is_active) {
                const array = [];

                el2.coords.coordinates.forEach((coord) => {
                  if (region && isCoordinateInRegion(coord, region)) {
                    array.push(coord);
                  }
                });

                if (array.length > 0) {
                  traceI++;
                  index++;

                  let color = "";

                  if (traceI == 0) {
                    color = "#df0000";
                  } else if (traceI == 1) {
                    color = "#d11507";
                  } else if (traceI == 2) {
                    color = "#a51b0b";
                  } else if (traceI == 3) {
                    color = "#7a1b0c";
                  } else {
                    color = "#df0000";
                  }

                  return (
                    <Polyline
                      coordinates={array}
                      strokeColor={color}
                      strokeWidth={2}
                      key={index}
                      onPress={() => handlePress(el.id, el2.id)}
                      tappable={true}
                    />
                  );
                }
              }
            });
          } else if (el.type == "Pociąg") {
            return el.traces.map((el2) => {
              if (el2.routes && el2.coords && el2.is_active) {
                const array = [];

                el2.coords.coordinates.forEach((coord) => {
                  if (region && isCoordinateInRegion(coord, region)) {
                    array.push(coord);
                  }
                });

                if (array.length > 0) {
                  traceI++;
                  index++;

                  let color = "";

                  if (traceI == 0) {
                    color = "#008000";
                  } else if (traceI == 1) {
                    color = "#0f6a08";
                  } else if (traceI == 2) {
                    color = "#14540d";
                  } else if (traceI == 3) {
                    color = "#15400e";
                  } else {
                    color = "#008000";
                  }

                  return (
                    <Polyline
                      coordinates={array}
                      strokeColor={color}
                      strokeWidth={2}
                      key={index}
                      onPress={() => handlePress(el.id, el2.id)}
                      tappable={true}
                    />
                  );
                }
              }
            });
          } else if (el.type == "Autobus") {
            return el.traces.map((el2) => {
              if (el2.routes && el2.coords && el2.is_active) {
                const array = [];

                el2.coords.coordinates.forEach((coord) => {
                  if (region && isCoordinateInRegion(coord, region)) {
                    array.push(coord);
                  }
                });

                if (array.length > 0) {
                  traceI++;
                  index++;

                  let color = "";

                  if (traceI == 0) {
                    color = Colors.PRIMARY;
                  } else if (traceI == 1) {
                    color = "royalblue";
                  } else if (traceI == 2) {
                    color = Colors.THIRD;
                  } else if (traceI == 3) {
                    color = Colors.FOURTH;
                  } else {
                    color = Colors.PRIMARY;
                  }

                  return (
                    <Polyline
                      coordinates={array}
                      strokeColor={color}
                      strokeWidth={2}
                      key={index}
                      onPress={() => handlePress(el.id, el2.id)}
                      tappable={true}
                    />
                  );
                }
              }
            });
          }
        }
      })}

      {stopMarkers.length > 0 &&
        showStopsNormal &&
        stopMarkers.map((el) => {
          if (region && isCoordinateInRegion(el, region)) {
            index++;

            let color = "";

            if (el.type == "Tramwaj") {
              color = "#df0000";
            } else if (el.type == "Pociąg") {
              color = "#008000";
            } else if (el.type == "Autobus") {
              color = Colors.PRIMARY;
            }

            const title = el.route + " | " + el.name + " " + el.number_of_stop;

            let description = "";

            if (el.start && !el.end) {
              description = "do " + el.stop_end;
            } else if (!el.start && el.end) {
              description = "Przystanek końcowy!";
            } else {
              description =
                el.order + ". " + el.stop_from + " -> " + el.stop_end;
            }
            return (
              <Marker
                coordinate={el}
                pinColor={color}
                key={index}
                title={title}
                description={description}
              />
            );
          }
        })}
    </>
  );
};

export default ZTMTraces;
