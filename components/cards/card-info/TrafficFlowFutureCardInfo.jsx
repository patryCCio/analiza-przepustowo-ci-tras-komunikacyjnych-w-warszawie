import {
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import { globalStyles } from "../../../constants/Globals";
  import { Colors } from "../../../constants/Colors";
  import { useContext, useEffect, useState } from "react";
  import { MapContext } from "../../../context/MapContext";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import { calculateTimeDifference } from "../../../context/redux/functions";
  import Title from "../Title";
  import HeaderCardInfo from "./HeaderCardInfo";
  
  const TrafficFlowFutureCardInfo = () => {
    const { traceInfo, hideAll } = useContext(MapContext);
  
    const [averagePerHour, setAveragePerHour] = useState(0);
    const [routeInfo, setRouteInfo] = useState({
      distance: 0,
      duration_osrm: 0,
      duration_timetable: 0,
    });
  
    const [times, setTimes] = useState({
      start: "",
      end: "",
    });
  
    const [ride, setRide] = useState({
      hours: 0,
      minutes: 0,
    });
  
    useEffect(() => {
      if (traceInfo) {
        const timeS = traceInfo.traces.routes[0].timetables.find(
          (el) => el.order == 0
        );
        const timeE = traceInfo.traces.routes[0].timetables.find(
          (el) => el.order == traceInfo.traces.routes[0].timetables.length - 1
        );
  
        const lengthTime = traceInfo.traces.routes[0].timetables.length;
  
        const hour = calculateTimeDifference(timeE.time, timeS.time);
  
        const avg = lengthTime / hour.hours;
  
        setAveragePerHour(avg.toFixed(2));
  
        setTimes({
          start: timeS.time,
          end: timeE.time,
        });
  
        let distance = 0;
        let duration_osrm = 0;
        let duration_timetable = 0;
  
        traceInfo.traces.coords.distance.forEach((el) => {
          distance += el.distance;
          duration_osrm += el.duration;
        });
  
        traceInfo.traces.routes.forEach((el) => {
          duration_timetable += el.timeFromPrev;
        });
  
        distance = Math.round(distance);
  
        setRouteInfo({
          duration_osrm,
          duration_timetable,
          distance,
        });
  
        setRide(hour);
      }
    }, []);
  
    return (
      traceInfo && (
        <View style={[globalStyles.cardZTM]}>
          <HeaderCardInfo
            traceInfo={traceInfo}
            text={"Prognozowany przypływ"}
            hideAll={hideAll}
          />
  
          <ScrollView
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
            }}
          >
            <View style={[style.info2, { margin: 0 }]}>
              <Text style={[style.outfit, style.size_medium]}>Pojemność</Text>
              <Text
                style={[
                  style.outfit_bold,
                  style.size_big,
                  { color: Colors.SECOND },
                ]}
              >
                {traceInfo.capacity}
              </Text>
            </View>
  
            <View style={[style.info2, { marginVertical: 0, marginBottom: 40 }]}>
              <Text style={[style.outfit, style.size_medium]}>Kursuje od</Text>
              <Text
                style={[
                  style.outfit_bold,
                  style.size_big,
                  { color: Colors.SECOND },
                ]}
              >
                {times.start}
              </Text>
              <Text style={[style.outfit, style.size_medium]}> do </Text>
              <Text
                style={[
                  style.outfit_bold,
                  style.size_big,
                  { color: Colors.SECOND },
                ]}
              >
                {times.end}
              </Text>
  
              <Text>({ride.hours} godz.)</Text>
            </View>
  
            <Title text={"Trasa"} />
  
            <View style={[style.info, { marginBottom: 40 }]}>
              <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
                {traceInfo.traces.stop_from}
              </Text>
              <AntDesign name="arrowdown" size={24} color={Colors.PRIMARY} />
              <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
                {traceInfo.traces.stop_end}
              </Text>
            </View>
  
            <View style={[style.info2, { margin: 0 }]}>
              <Text style={[style.outfit, style.size_medium]}>
                Liczba przystanków
              </Text>
              <Text
                style={[
                  style.outfit_bold,
                  style.size_big,
                  { color: Colors.SECOND },
                ]}
              >
                {traceInfo.traces.routes.length}
              </Text>
            </View>
  
            <View style={[style.info2, { marginBottom: 40 }]}>
              <Text style={[style.outfit, style.size_medium]}>Długość trasy</Text>
              <Text
                style={[
                  style.outfit_bold,
                  style.size_big,
                  { color: Colors.SECOND },
                ]}
              >
                {routeInfo.distance / 1000} km
              </Text>
            </View>
  
            <Title text={"Czas przejazdu"} />
  
            <View style={[style.info2, { margin: 0 }]}>
              <Text style={[style.outfit, style.size_medium]}>
                Czas przejazdu (OSRM)
              </Text>
              <Text
                style={[
                  style.outfit_bold,
                  style.size_big,
                  { color: Colors.SECOND },
                ]}
              >
                {parseInt(routeInfo.duration_osrm % 60)} min
              </Text>
            </View>
  
            <View style={[style.info2, { margin: 0 }]}>
              <Text style={[style.outfit, style.size_medium]}>
                Czas przejazdu (Rozkład jazdy)
              </Text>
              <Text
                style={[
                  style.outfit_bold,
                  style.size_big,
                  { color: Colors.SECOND },
                ]}
              >
                {parseInt(routeInfo.duration_timetable % 60)} min
              </Text>
            </View>
  
            <Title text={"Liczba wystąpień"} />
  
            <View style={[style.stats1, { marginBottom: 40 }]}>
              <View>
                <View style={style.stats_dot}>
                  <Text
                    style={[
                      style.outfit_bold,
                      style.size_small,
                      { color: Colors.PRIMARY },
                    ]}
                  >
                    {traceInfo.traces.routes[0].timetables.length}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontFamily: "outfit",
                  }}
                >
                  na dzień
                </Text>
              </View>
              <View>
                <View style={style.stats_dot}>
                  <Text
                    style={[
                      style.outfit_bold,
                      style.size_small,
                      { color: Colors.PRIMARY },
                    ]}
                  >
                    {averagePerHour}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontFamily: "outfit",
                  }}
                >
                  na godzinę
                </Text>
              </View>
            </View>
  
            <Title text={"Analiza"} />
          </ScrollView>
        </View>
      )
    );
  };
  
  const style = StyleSheet.create({
    title: {
      fontFamily: "outfit-medium",
      fontSize: 22,
      color: "white",
      backgroundColor: Colors.PRIMARY,
      width: "100%",
      padding: 8,
      textAlign: "center",
      borderRadius: 4,
    },
  
    info: {
      alignItems: "center",
      gap: 10,
      marginVertical: 10,
    },
    outfit: {
      fontFamily: "outfit",
    },
    outfit_medium: {
      fontFamily: "outfit-medium",
    },
    outfit_bold: {
      fontFamily: "outfit-bold",
    },
  
    size_small: {
      fontSize: 16,
    },
    size_medium: {
      fontSize: 18,
    },
    size_big: {
      fontSize: 22,
    },
    info2: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginVertical: 10,
    },
  
    stats1: {
      flexDirection: "row",
      alignItems: "center",
      gap: 30,
      marginVertical: 10,
      justifyContent: "center",
    },
  
    stats_dot: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: Colors.PRIMARY,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
  export default TrafficFlowFutureCardInfo;
  