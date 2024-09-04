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

const ShortestPathCardArray = () => {
  const { hideAll, shortestPathArray, actualShortest, setActualShortest } =
    useContext(MapContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shortestPathArray.length > 0) {
      setLoading(false);
    }
  }, [shortestPathArray]);

  return (
    <View style={[globalStyles.cardZTM]}>
      {loading ? (
        <LoadingTrace text={"Ładowanie danych!"} />
      ) : (
        shortestPathArray.length > 0 && (
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
            <ScrollView
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                position: "relative",
              }}
            >
              <View style={{ gap: 20 }}>
                {shortestPathArray.map((el, index) => {
                  let distance = 0;
                  let count = 0;

                  el.arr.forEach((el2) => {
                    if (el2.type == "Pieszo") {
                      count++;
                    }
                    el2.distance.forEach((el3) => {
                      distance += el3.distance;
                    });
                  });

                  count -= 2;
                  distance = distance.toFixed(0);

                  return (
                    <TouchableOpacity onPress={() => setActualShortest(index)}>
                      <View
                        style={{
                          width: "100%",
                          backgroundColor:
                            index == actualShortest ? Colors.PRIMARY : "#eee",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 15
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "outfit-medium",
                            fontSize: 20,
                            color:
                              index != actualShortest
                                ? Colors.PRIMARY
                                : "#fefefe",
                          }}
                        >
                          Trasa {index + 1}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color:
                              index != actualShortest
                                ? Colors.PRIMARY
                                : "#fefefe",
                          }}
                        >
                          Czas: {Math.floor(el.info.totalTimeWithDelay / 3600)}{" "}
                          godz{" "}
                          {Math.floor((el.info.totalTimeWithDelay % 3600) / 60)}{" "}
                          min
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color:
                              index != actualShortest
                                ? Colors.PRIMARY
                                : "#fefefe",
                          }}
                        >
                          Dystans: {distance / 1000} km
                        </Text>

                        <Text
                          style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color:
                              index != actualShortest
                                ? Colors.PRIMARY
                                : "#fefefe",
                          }}
                        >
                          Przsiadek: {count}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
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

export default ShortestPathCardArray;
