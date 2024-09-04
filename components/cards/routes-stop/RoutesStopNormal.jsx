import { Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";

const RoutesStopNormal = ({ style, actualRouteIndex, route }) => {
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
                      backgroundColor: Colors.PRIMARY,
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
                      {el.name + " " + el.number_of_stop}
                    </Text>
                  )}

                  {actualRouteIndex == 1 && (
                    <Text
                      style={{
                        fontFamily: "outfit-medium",
                        fontSize: 14,
                      }}
                    >
                      {el.name +
                        " " +
                        el.number_of_stop +
                        " (" +
                        el.other_connects.length +
                        ")"}
                    </Text>
                  )}

                  {index > 0 && actualRouteIndex == 0 && (
                    <Text
                      style={{
                        fontFamily: "outfit",
                        fontSize: 12,
                        position: "absolute",
                        top: -40,
                        left: 50,
                        color: Colors.THIRD,
                      }}
                    >
                      {el.timeFromZero + " min"}
                    </Text>
                  )}

                  {actualRouteIndex == 1 && (
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
                            borderColor: Colors.PRIMARY,
                            borderWidth: 1,
                            textAlign: "center",
                            color: Colors.PRIMARY,
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

                {index != route.length - 1 && actualRouteIndex == 0 && (
                  <View
                    style={{
                      width: 2,
                      height: 40,
                      marginLeft: 19,
                      backgroundColor: Colors.SECOND,
                    }}
                  />
                )}

                {index != route.length - 1 &&
                  actualRouteIndex == 1 &&
                  el.other_connects.length < 5 && (
                    <View
                      style={{
                        width: 2,
                        height: 40,
                        marginLeft: 19,
                        backgroundColor: Colors.SECOND,
                      }}
                    />
                  )}

                {index != route.length - 1 &&
                  actualRouteIndex == 1 &&
                  el.other_connects.length >= 5 && (
                    <View
                      style={{
                        width: 2,
                        height: 80,
                        marginLeft: 19,
                        backgroundColor: Colors.SECOND,
                      }}
                    />
                  )}

                {index != route.length - 1 &&
                  actualRouteIndex == 1 &&
                  el.other_connects.length >= 12 && (
                    <View
                      style={{
                        width: 2,
                        height: 120,
                        marginLeft: 19,
                        backgroundColor: Colors.SECOND,
                      }}
                    />
                  )}

                {index != route.length - 1 &&
                  actualRouteIndex == 1 &&
                  el.other_connects.length >= 18 && (
                    <View
                      style={{
                        width: 2,
                        height: 140,
                        marginLeft: 19,
                        backgroundColor: Colors.SECOND,
                      }}
                    />
                  )}
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default RoutesStopNormal;
