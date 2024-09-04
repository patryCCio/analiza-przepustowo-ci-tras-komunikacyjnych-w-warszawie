import { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MapContext } from "../../context/MapContext";
import { globalStyles } from "../../constants/Globals";
import LoadingTrace from "../LoadingTrace";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Checkbox } from "react-native-paper";

const color = {
  Autobus: Colors.PRIMARY,
  Tramwaj: "tomato",
  Pociąg: "green",
  Pieszo: "orange",
};

const ShortestPathCard = () => {
  const {
    hideAll,
    setShowShortestTrace,
    setShowShortestMarker,
    showShortestMarker,
    showShortestTrace,
    shortestPathArray,
    actualShortest,
    setWalk,
  } = useContext(MapContext);

  const [averageCapacity, setAverageCapacity] = useState(0);
  const [length, setLength] = useState(0);

  const [length2, setLength2] = useState({
    walk: 0,
    bus: 0,
    train: 0,
    tram: 0,
  });

  const [walkOnly, setWalkOnly] = useState(false);

  const [loading, setLoading] = useState(false);

  const [shortestPath, setShortestPath] = useState([]);
  const [shortestPathInfo, setShortestPathInfo] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (shortestPathArray.length > 0) {
      shortestPathArray.forEach((el, index) => {
        if (index == actualShortest) {
          setShortestPath(el.arr);
          setShortestPathInfo(el.info);
        }
      });
    }
  }, [shortestPathArray, actualShortest]);

  useEffect(() => {
    if (shortestPath.length > 0 && shortestPathInfo) {
      let sum = 0;
      let count = 0;

      let length = 0;
      let lengthWalk = 0;
      let lengthTrain = 0;
      let lengthTram = 0;
      let lengthBus = 0;

      shortestPath.forEach((el) => {
        if (el.type != "Pieszo") {
          count++;
          sum += parseFloat(el.data[0].capacity_per_hour);
        }

        el.distance.forEach((el2) => {
          length += el2.distance;
        });

        if (el.type == "Autobus") {
          el.distance.forEach((el2) => {
            lengthBus += el2.distance;
          });
        } else if (el.type == "Tramwaj") {
          el.distance.forEach((el2) => {
            lengthTram += el2.distance;
          });
        } else if (el.type == "Pociąg") {
          el.distance.forEach((el2) => {
            lengthTrain += el2.distance;
          });
        } else if (el.type == "Pieszo") {
          el.distance.forEach((el2) => {
            lengthWalk += el2.distance;
          });
        }
      });

      if (sum > 0 && count > 0) {
        sum /= count;
        setAverageCapacity(sum);
        setWalkOnly(false);
        setWalk(false);
      } else {
        setWalkOnly(true);
        setWalk(true);
      }

      length = length.toFixed(0);
      lengthTram = lengthTram.toFixed(0);
      lengthTrain = lengthTrain.toFixed(0);
      lengthBus = lengthBus.toFixed(0);
      lengthWalk = lengthWalk.toFixed(0);

      setLength(length / 1000);
      setLength2({
        tram: lengthTram / 1000,
        train: lengthTrain / 1000,
        bus: lengthBus / 1000,
        walk: lengthWalk / 1000,
      });

      setLoading(false);
    }
  }, [shortestPath, shortestPathInfo]);

  return (
    <View style={[globalStyles.cardZTM]}>
      {loading ? (
        <LoadingTrace text={"Ładowanie danych!"} />
      ) : (
        shortestPath.length > 0 &&
        shortestPathInfo && (
          <>
            <TouchableOpacity style={{ height: 50 }} onPress={hideAll}>
              <Feather
                name="x"
                size={24}
                style={{
                  position: "absolute",
                  right: 5,
                  top: 0,
                  zIndex: 1,
                }}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
            <View style={{ gap: 5, marginBottom: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  color={Colors.PRIMARY}
                  status={showShortestTrace ? "checked" : "unchecked"}
                  onPress={() =>
                    setShowShortestTrace((prevState) => !prevState)
                  }
                />
                <Text>Pokaż trasę</Text>
              </View>
              {!walkOnly && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    color={Colors.PRIMARY}
                    status={showShortestMarker ? "checked" : "unchecked"}
                    onPress={() =>
                      setShowShortestMarker((prevState) => !prevState)
                    }
                  />
                  <Text>Pokaż Przystanki</Text>
                </View>
              )}
            </View>
            <ScrollView
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                position: "relative",
              }}
            >
              <View style={{ gap: 20, paddingBottom: 50 }}>
                {!walkOnly && (
                  <View>
                    <Text style={styles.title}>
                      Średnia przepustowość (os/h)
                    </Text>
                    <Text style={styles.text}>{averageCapacity}</Text>
                    {averageCapacity < 10 && (
                      <Text style={{ color: "tomato" }}>
                        Brak możliwości dojechania w tym momencie!
                      </Text>
                    )}
                  </View>
                )}
                <View>
                  <Text style={styles.title}>Całkowity dystans</Text>
                  <Text style={styles.text}>{length} km</Text>
                </View>

                {!walkOnly && (
                  <>
                    <View>
                      <Text style={styles.title}>
                        Czas przejazdu bez opóźnień
                      </Text>
                      <Text style={styles.text}>
                        ok {Math.floor(shortestPathInfo.totalTime / 3600)} godz{" "}
                        {Math.floor((shortestPathInfo.totalTime % 3600) / 60)}{" "}
                        min
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.title}>Opóźnienie na całą trasę</Text>
                      <Text style={styles.text}>
                        ok {Math.floor(shortestPathInfo.totalDelay / 3600)} godz{" "}
                        {Math.floor((shortestPathInfo.totalDelay % 3600) / 60)}{" "}
                        min
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.title}>
                        Przewidywany czas podróży
                      </Text>
                      <Text style={styles.text}>
                        ok{" "}
                        {Math.floor(shortestPathInfo.totalTimeWithDelay / 3600)}{" "}
                        godz{" "}
                        {Math.floor(
                          (shortestPathInfo.totalTimeWithDelay % 3600) / 60
                        )}{" "}
                        min
                      </Text>
                    </View>
                  </>
                )}

                {length2.bus > 0 && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <FontAwesome5
                        name="bus"
                        size={28}
                        color={Colors.PRIMARY}
                      />
                      <Text style={styles.title2}>Autobusem</Text>
                    </View>
                    <Text style={styles.text}>{length2.bus} km</Text>
                    <Text style={styles.text}>
                      ok {Math.floor(shortestPathInfo.total.totalBus / 3600)}{" "}
                      godz{" "}
                      {Math.floor(
                        (shortestPathInfo.total.totalBus % 3600) / 60
                      )}{" "}
                      min
                    </Text>
                  </View>
                )}
                {length2.tram > 0 && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <FontAwesome5
                        name="tram"
                        size={28}
                        color={Colors.PRIMARY}
                      />
                      <Text style={styles.title2}>Tramwajem</Text>
                    </View>
                    <Text style={styles.text}>{length2.tram} km</Text>
                    <Text style={styles.text}>
                      ok {Math.floor(shortestPathInfo.total.totalTram / 3600)}{" "}
                      godz{" "}
                      {Math.floor(
                        (shortestPathInfo.total.totalTram % 3600) / 60
                      )}{" "}
                      min
                    </Text>
                  </View>
                )}

                {length2.train > 0 && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <FontAwesome5
                        name="train"
                        size={28}
                        color={Colors.PRIMARY}
                      />
                      <Text style={styles.title2}>Pociągiem</Text>
                    </View>
                    <Text style={styles.text}>{length2.train} km</Text>
                    <Text style={styles.text}>
                      ok {Math.floor(shortestPathInfo.total.totalTrain / 3600)}{" "}
                      godz{" "}
                      {Math.floor(
                        (shortestPathInfo.total.totalTrain % 3600) / 60
                      )}{" "}
                      min
                    </Text>
                  </View>
                )}

                {length2.walk > 0 && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <FontAwesome5
                        name="walking"
                        size={28}
                        color={Colors.PRIMARY}
                      />
                      <Text style={styles.title2}>Pieszo</Text>
                    </View>
                    <Text style={styles.text}>{length2.walk} km</Text>
                    <Text style={styles.text}>
                      ok {Math.floor(shortestPathInfo.total.totalWalk / 3600)}{" "}
                      godz{" "}
                      {Math.floor(
                        (shortestPathInfo.total.totalWalk % 3600) / 60
                      )}{" "}
                      min
                    </Text>
                  </View>
                )}

                <View>
                  <View style={{ gap: 15, marginBottom: 40 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItem: "center",
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          backgroundColor: Colors.PRIMARY,
                        }}
                      />
                      <Text>Autobus</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItem: "center",
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          backgroundColor: "tomato",
                        }}
                      />
                      <Text>Tramwaj</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItem: "center",
                        gap: 10,
                      }}
                    >
                      <View style={{ width: 30, backgroundColor: "green" }} />
                      <Text>Pociąg</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItem: "center",
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          backgroundColor: "orange",
                        }}
                      />
                      <Text>Na piechotę</Text>
                    </View>
                  </View>

                  {shortestPath.map((el, index) => {
                    if (el.type == "Pieszo") {
                      return el.data.map((el2, index2) => {
                        if (walkOnly) {
                          return (
                            <>
                              <View
                                style={{
                                  width: "100%",
                                  position: "relative",
                                  alignItems: "center",
                                  paddingRight: 120,
                                }}
                              >
                                <View
                                  style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: color[el.type],
                                    borderRadius: 15,
                                  }}
                                />
                                <Text
                                  style={{
                                    position: "absolute",
                                    right: 80,
                                    top: 5,
                                    fontFamily: "outfit",
                                  }}
                                >
                                  {"START"}
                                </Text>
                              </View>
                              <View
                                style={{
                                  position: "relative",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  paddingRight: 66,
                                  gap: 10,
                                }}
                                key={index + "-PIESZO-" + index2}
                              >
                                <View
                                  style={{
                                    backgroundColor: color[el.type],
                                    height: el.distance[0].distance / 5,
                                    width: 2,
                                  }}
                                ></View>
                                <Text style={{ fontFamily: "outfit-medium" }}>
                                  {el.distance[0].distance.toFixed(0) + " m"}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: "100%",
                                  position: "relative",
                                  alignItems: "center",
                                  paddingRight: 120,
                                }}
                              >
                                <View
                                  style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: color[el.type],
                                    borderRadius: 15,
                                  }}
                                />
                                <Text
                                  style={{
                                    position: "absolute",
                                    right: 80,
                                    top: 5,
                                    fontFamily: "outfit",
                                  }}
                                >
                                  {"KONIEC"}
                                </Text>
                              </View>
                            </>
                          );
                        } else {
                          return (
                            <View
                              style={{
                                position: "relative",
                                alignItems: "center",
                                paddingRight: 120,
                              }}
                              key={index + "-PIESZO-" + index2}
                            >
                              <View
                                style={{
                                  backgroundColor: color[el.type],
                                  height: el.distance[0].distance / 5,
                                  width: 2,
                                }}
                              ></View>
                            </View>
                          );
                        }
                      });
                    } else {
                      return el.data.map((el2, index2) => {
                        return (
                          <View
                            style={{
                              position: "relative",
                              alignItems: "center",
                              paddingRight: 120,
                            }}
                            key={el2.route + "-" + el.type + "-" + index2}
                          >
                            <View style={{ position: "relative" }}>
                              <View
                                style={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor: color[el.type],
                                  borderRadius: 15,
                                }}
                              >
                                {}
                              </View>
                              <Text
                                style={{
                                  position: "absolute",
                                  left: 40,
                                  top: 5,
                                  fontFamily: "outfit",
                                }}
                              >
                                {el2.stop_name + " " + el2.number_of_stop}
                              </Text>

                              {index2 == 0 && (
                                <>
                                  <View
                                    style={{
                                      position: "absolute",
                                      right: 75,
                                      top: el.data.length * 40 - 60,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontFamily: "outfit-medium",
                                        color: Colors.SECOND,
                                      }}
                                    >
                                      {el.data.length}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      height: "100%",
                                      position: "absolute",
                                      right: 90,
                                      top: -30,
                                      alignItems: "center",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontFamily: "outfit-bold",
                                        color: Colors.PRIMARY,
                                        fontSize: 20,
                                      }}
                                    >
                                      {el2.route}
                                    </Text>
                                    <View
                                      style={{
                                        height: el.data.length * 80 - 50,
                                        width: 1,
                                        backgroundColor: "gray",
                                      }}
                                    />
                                  </View>
                                </>
                              )}
                            </View>

                            {index2 != el.data.length - 1 && (
                              <View>
                                <View
                                  style={{
                                    backgroundColor: color[el.type],
                                    height: 50,
                                    width: 2,
                                  }}
                                />
                                <View></View>
                              </View>
                            )}
                          </View>
                        );
                      });
                    }
                  })}
                </View>
              </View>
            </ScrollView>
          </>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    color: Colors.PRIMARY,
  },

  title2: {
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
    fontSize: 18,
  },

  text: {
    fontFamily: "outfit",
    fontSize: 16,
    marginTop: 7,
  },
});

export default ShortestPathCard;
