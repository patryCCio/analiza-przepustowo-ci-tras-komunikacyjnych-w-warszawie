import { Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";

const RoutesStopTraffic = ({ style, actualRouteIndex, route }) => {
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

  return (
    <View style={[style.info2, { paddingBottom: 80 }]}>
      <View style={style.stops}>
        {route.length > 0 &&
          route.map((el, index) => {
            return (
              <View
                style={{
                  paddingLeft: 50,
                  alignItems: "flex-start",
                  width: "100%",
                }}
                key={index}
              >
                {index == route.length - 1 && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 2,
                        height: el.total_length / 15,
                        minHeight: 30,
                        marginLeft: 19,
                        backgroundColor: districtColors[el.name],
                      }}
                    />
                    {actualRouteIndex == 0 && (
                      <>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            color: districtColors[el.name],
                            paddingLeft: 15,
                          }}
                        >
                          {el.total_time + " min"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-medium",
                            paddingLeft: 10,
                            fontSize: 12,
                          }}
                        >
                          {el.total_length.toFixed(0) + " m"}
                        </Text>
                      </>
                    )}
                  </View>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 25,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: districtColors[el.name],
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "outfit-bold",
                      }}
                    >
                      {el.order}
                    </Text>
                  </View>
                  {actualRouteIndex == 0 && (
                    <Text
                      style={{
                        fontFamily: "outfit-medium",
                        fontSize: 14,
                      }}
                    >
                      {el.name}
                    </Text>
                  )}

                  {actualRouteIndex == 1 && (
                    <Text
                      style={{
                        fontFamily: "outfit-medium",
                        fontSize: 14,
                      }}
                    >
                      {el.stops.length == 1 &&
                        el.name + " (" + el.stops.length + " przystanek)"}

                      {el.stops.length == 0 ||
                        (el.stops.length >= 5 &&
                          el.name + " (" + el.stops.length + " przystanków)")}

                      {el.stops.length > 1 &&
                        el.stops.length < 5 &&
                        el.name + " (" + el.stops.length + " przystanki)"}
                    </Text>
                  )}

                  {actualRouteIndex == 1 && index < route.length - 1 && (
                    <View
                      style={{
                        fontFamily: "outfit",
                        fontSize: 12,
                        position: "absolute",
                        top: 40,
                        left: 50,
                        maxWidth: 220,
                        color: Colors.THIRD,
                        flexDirection: "row",
                        gap: 5,
                        flexWrap: "wrap",
                      }}
                    >
                      {el.other_connects.map((el2, index2) => (
                        <Text
                          key={el2.route + " | " + index2}
                          style={{
                            borderColor: districtColors[el.name],
                            borderWidth: 1,
                            textAlign: "center",
                            color: districtColors[el.name],
                            width: 40,
                            height: 20,
                          }}
                        >
                          {el2.route}
                        </Text>
                      ))}
                    </View>
                  )}

                  {actualRouteIndex == 1 && index == route.length - 1 && (
                    <View
                      style={{
                        fontFamily: "outfit",
                        fontSize: 12,
                        position: "absolute",
                        top: -50,
                        left: 50,
                        maxWidth: 220,
                        color: Colors.THIRD,
                        flexDirection: "row",
                        gap: 5,
                        flexWrap: "wrap",
                      }}
                    >
                      {el.other_connects.map((el2, index2) => (
                        <Text
                          key={el2.route + " | " + index2}
                          style={{
                            borderColor: districtColors[el.name],
                            borderWidth: 1,
                            textAlign: "center",
                            color: districtColors[el.name],
                            width: 40,
                            height: 20,
                          }}
                        >
                          {el2.route}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>

                {index != route.length - 1 && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 2,
                        height: el.total_length / 15,
                        minHeight: 30,
                        marginLeft: 19,
                        backgroundColor: districtColors[el.name],
                      }}
                    />
                    {actualRouteIndex == 0 && (
                      <>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            color: districtColors[el.name],
                            paddingLeft: 15,
                          }}
                        >
                          {el.total_time + " min"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-medium",
                            paddingLeft: 10,
                            fontSize: 12,
                          }}
                        >
                          {el.total_length.toFixed(0) + " m"}
                        </Text>
                      </>
                    )}
                  </View>
                )}
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default RoutesStopTraffic;
