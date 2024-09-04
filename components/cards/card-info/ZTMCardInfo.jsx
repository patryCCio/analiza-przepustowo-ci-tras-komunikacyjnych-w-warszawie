import { ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../../constants/Globals";
import { Colors } from "../../../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../../context/MapContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { calculateTimeDifference } from "../../../context/redux/functions";
import Title from "../Title";
import HeaderCardInfo from "./HeaderCardInfo";
import { useSelector } from "react-redux";
import api from "../../../api/api";
import Bar from "./Diagrams/Bar";
import { Button } from "react-native-paper";
import Line from "./Diagrams/Line";
import Pie from "./Diagrams/Pie";
import RoutesStopNormal from "../routes-stop/RoutesStopNormal";
import LoadingTrace from "../../LoadingTrace";

const ZTMCardInfo = () => {
  const { traceData, hideAll } = useContext(MapContext);
  const { stops } = useSelector((state) => state.root.data);

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

  const [loading, setLoading] = useState(true);

  const [route, setRoute] = useState([]);
  const [analize, setAnalize] = useState([]);
  const [timetables, setTimetables] = useState([]);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [labels, setLabels] = useState([]);
  const [labels2, setLabels2] = useState([]);

  const [actualDiagramIndex, setActualDiagramIndex] = useState(0);
  const [actualRouteIndex, setActualRouteIndex] = useState(0);

  const setDataAnalize = () => {
    const arrayData = analize.map((el) => {
      return el.distance;
    });
    const arrayLabels = analize.map((el) => {
      return el.name + " " + el.number_of_stop;
    });

    const arrayData2 = analize.map((el) => {
      if (el.timeFromZero == undefined) {
        return 0;
      } else return String(el.timeFromZero);
    });

    const arrayData3 = analize.map((el) => {
      if (el.timeFromPrev == undefined) {
        return 0;
      } else return String(el.timeFromPrev);
    });

    const array = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];

    const d = [];

    array.forEach((el) => {
      const split = el.split(":")[0];
      let count = 0;
      timetables.forEach((el2) => {
        const split2 = el2.time.split(":")[0];

        if (split == split2) {
          count++;
        }
      });

      d.push(count);
    });

    setData(arrayData);
    setData2(arrayData2);
    setData3(arrayData3);
    setData4(d);
    setLabels(arrayLabels);
    setLabels2(array);
  };

  useEffect(() => {
    if (analize.length > 0 && timetables.length > 0) {
      setDataAnalize();
    }
  }, [analize, timetables, actualDiagramIndex]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.post("operations/get-distances-between-stops", {
        traceData,
        stops,
      });

      setAnalize(res.data.data);
      setTimetables(res.data.timetables);
      setRoute(res.data.data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (traceData != null && analize.length == 0) {
      getData();
    }
  }, [traceData, analize]);

  useEffect(() => {
    if (traceData) {
      const timeS = traceData.traces.routes[0].timetables.find(
        (el) => el.order == 0
      );
      const timeE = traceData.traces.routes[0].timetables.find(
        (el) => el.order == traceData.traces.routes[0].timetables.length - 1
      );

      const hour = calculateTimeDifference(timeE.time, timeS.time);

      setTimes({
        start: timeS.time,
        end: timeE.time,
      });

      let distance = 0;
      let duration_osrm = 0;
      let duration_timetable = 0;

      traceData.traces.coords.distance.forEach((el) => {
        distance += el.distance;
        duration_osrm += el.duration;
      });

      traceData.traces.routes.forEach((el) => {
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
  }, [traceData]);

  return (
    traceData && (
      <View style={[globalStyles.cardZTM]}>
        {loading ? (
          <LoadingTrace text={"Ładowanie danych do analizy!"} />
        ) : (
          <>
            <HeaderCardInfo
              traceData={traceData}
              text={"Podstawowe informacje"}
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
                <Text style={[style.outfit, style.size_medium]}>
                  Pojemność pojazdu
                </Text>
                <Text
                  style={[
                    style.outfit_bold,
                    style.size_big,
                    { color: Colors.SECOND },
                  ]}
                >
                  {traceData.capacity}
                </Text>
              </View>

              <View
                style={[style.info2, { marginVertical: 0, marginBottom: 40 }]}
              >
                <Text style={[style.outfit, style.size_medium]}>
                  Kursuje od
                </Text>
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

              <Title text={"Wykresy"} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 20,
                }}
              >
                <Button
                  mode={actualDiagramIndex == 0 ? "contained" : "outlined"}
                  style={{ width: 120 }}
                  onPress={() => setActualDiagramIndex(0)}
                >
                  Słupkowy
                </Button>
                <Button
                  mode={actualDiagramIndex == 1 ? "contained" : "outlined"}
                  style={{ width: 100 }}
                  onPress={() => setActualDiagramIndex(1)}
                >
                  Liniowy
                </Button>
                <Button
                  mode={actualDiagramIndex == 2 ? "contained" : "outlined"}
                  style={{ width: 100 }}
                  onPress={() => setActualDiagramIndex(2)}
                >
                  Kołowy
                </Button>
              </View>

              {actualDiagramIndex == 0 && (
                <>
                  <Bar
                    suffix="m"
                    data={data}
                    labels={labels}
                    textDiagram={"Dystans do kolejnego przystanku (m)"}
                  />

                  <Bar
                    suffix="min"
                    data={data2}
                    labels={labels}
                    textDiagram={"Czas od początkowego przystanku (min)"}
                  />

                  <Bar
                    suffix="min"
                    data={data3}
                    labels={labels}
                    textDiagram={
                      "Czas przejazdu od poprzedniego przystanku (min)"
                    }
                  />

                  <Bar
                    suffix=""
                    data={data4}
                    labels={labels2}
                    textDiagram={"Liczba pojazdów na godzinę"}
                  />
                </>
              )}

              {actualDiagramIndex == 1 && (
                <>
                  <Line
                    suffix="m"
                    data={data}
                    labels={labels}
                    textDiagram={"Dystans do kolejnego przystanku (m)"}
                  />

                  <Line
                    suffix="min"
                    data={data2}
                    labels={labels}
                    textDiagram={"Czas od początkowego przystanku (min)"}
                  />

                  <Line
                    suffix="min"
                    data={data3}
                    labels={labels}
                    textDiagram={
                      "Czas przejazdu od poprzedniego przystanku (min)"
                    }
                  />
                  <Line
                    suffix=""
                    data={data4}
                    labels={labels2}
                    textDiagram={"Liczba pojazdów na godzinę"}
                  />
                </>
              )}

              {actualDiagramIndex == 2 && (
                <>
                  <Pie
                    data={data}
                    labels={labels}
                    textDiagram={"Dystans do kolejnego przystanku (m)"}
                  />

                  <Pie
                    data={data2}
                    labels={labels}
                    textDiagram={"Czas od początkowego przystanku (min)"}
                  />

                  <Pie
                    data={data3}
                    labels={labels}
                    textDiagram={
                      "Czas przejazdu od poprzedniego przystanku (min)"
                    }
                  />

                  <Pie
                    data={data4}
                    labels={labels2}
                    textDiagram={
                      "Czas przejazdu od poprzedniego przystanku (min)"
                    }
                  />
                </>
              )}

              <Title text={"Trasa"} />

              <View style={[style.info, { marginBottom: 40 }]}>
                <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
                  {traceData.traces.stop_from}
                </Text>
                <AntDesign name="arrowdown" size={24} color={Colors.PRIMARY} />
                <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
                  {traceData.traces.stop_end}
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
                  {traceData.traces.routes.length}
                </Text>
              </View>

              <View style={[style.info2, { margin: 0 }]}>
                <Text style={[style.outfit, style.size_medium]}>
                  Długość trasy
                </Text>
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

              <View style={[style.info2, { marginBottom: 40 }]}>
                <Text style={[style.outfit, style.size_medium]}>
                  Czas przejazdu
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  marginVertical: 20,
                }}
              >
                <Button
                  mode={actualRouteIndex == 0 ? "contained" : "outlined"}
                  style={{ width: 120 }}
                  onPress={() => setActualRouteIndex(0)}
                >
                  Czas
                </Button>
                <Button
                  mode={actualRouteIndex == 1 ? "contained" : "outlined"}
                  style={{ width: 150 }}
                  onPress={() => setActualRouteIndex(1)}
                >
                  Przesiadki
                </Button>
              </View>

              <RoutesStopNormal
                style={style}
                actualRouteIndex={actualRouteIndex}
                route={route}
              />
            </ScrollView>
          </>
        )}
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

export default ZTMCardInfo;
