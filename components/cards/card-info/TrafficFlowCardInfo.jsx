import { ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../../constants/Globals";
import { Colors } from "../../../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../../context/MapContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  calculateLoadIndicator,
  getLOSClass,
  getRoadClass,
} from "../../../context/redux/functions";
import Title from "../Title";
import { useSelector } from "react-redux";
import api from "../../../api/api";
import { Button } from "react-native-paper";
import LoadingTrace from "../../LoadingTrace";
import Diagrams from "./Diagrams/Diagrams";
import HeaderCardInfoSmaller from "./HeaderCardInfoSmaller";

const colorLOS = {
  A: Colors.PRIMARY,
  B: "royalblue",
  C: "green",
  D: "gold",
  E: "orangered",
  F: "#8f0909",
};

const TrafficFlowCardInfo = () => {
  const { traceData, hideAll, analizeEl, setAnalizeEl } =
    useContext(MapContext);
  const { stops } = useSelector((state) => state.root.data);

  const [avgIndicator, setAvgIndicator] = useState(0);

  const [values, setValues] = useState(null);
  const [actualTime, setActualTime] = useState(0);

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

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [data9, setData9] = useState([]);
  const [data10, setData10] = useState([]);

  const [type, setType] = useState("speed");

  const [loading, setLoading] = useState(false);

  const [cVeh, setCVeh] = useState(0);

  const [actualDiagramIndex, setActualDiagramIndex] = useState(0);

  const setMove = (choice) => {
    if (choice == "right") {
      if (actualTime == 2) {
        setActualTime(0);
      } else setActualTime((prevState) => prevState + 1);
    } else {
      if (actualTime == 0) {
        setActualTime(2);
      } else setActualTime((prevState) => prevState - 1);
    }
  };

  const setDataAnalize = () => {
    const labelArray = [];
    traceData.traces.routes.forEach((el) => {
      stops.forEach((el2) => {
        if (el.stop_id == el2.id) {
          labelArray.push(el2.name + " " + el2.number_of_stop);
        }
      });
    });

    labelArray.shift();

    const data_1_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.avgSpeed * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_1_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.avgSpeed * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_1_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.avgSpeed * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    const data_2_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.avgConfidence * 100;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_2_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.avgConfidence * 100;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_2_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.avgConfidence * 100;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    const data_3_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.avgJamFactor;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_3_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.avgJamFactor;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_3_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.avgJamFactor;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    const data_4_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.avgFreeFlow * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_4_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.avgFreeFlow * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_4_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.avgFreeFlow * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    const data_5_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.avgPopulationDensity;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_5_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.avgPopulationDensity;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_5_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.avgPopulationDensity;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    const data_6_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.avgLanes;
      it = parseFloat(it);
      return it;
    });
    const data_6_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.avgLanes;
      it = parseFloat(it);
      return it;
    });
    const data_6_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.avgLanes;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    const data_7_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.c;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_7_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.c;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_7_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.c;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    const data_8_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.travelTimeWithDelays / 60;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_8_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.travelTimeWithDelays / 60;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_8_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.travelTimeWithDelays / 60;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    const data_9_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.totalDelay / 60;
      it = parseFloat(it.toFixed(0));
      return it;
    });
    const data_9_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.totalDelay / 60;
      it = parseFloat(it.toFixed(0));
      return it;
    });
    const data_9_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.totalDelay / 60;
      it = parseFloat(it.toFixed(0));
      return it;
    });

    const data_10_0 = analizeEl.traces.results_0.map((el) => {
      let it = el.finalSpeed * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_10_1 = analizeEl.traces.results_1.map((el) => {
      let it = el.finalSpeed * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });
    const data_10_2 = analizeEl.traces.results_2.map((el) => {
      let it = el.finalSpeed * 3.6;
      it = parseFloat(it.toFixed(2));
      return it;
    });

    let averageSpeed0 = 0;
    let averageJamFactor0 = 0;
    let averageFreeFlow0 = 0;
    let averageFinalSpeed0 = 0;
    let totalTimeWithDelay0 = 0;
    let totalTimeWithoutDelay0 = 0;
    let c0 = 0;

    let averageSpeed1 = 0;
    let averageJamFactor1 = 0;
    let averageFreeFlow1 = 0;
    let averageFinalSpeed1 = 0;
    let totalTimeWithDelay1 = 0;
    let totalTimeWithoutDelay1 = 0;
    let c1 = 0;

    let averageSpeed2 = 0;
    let averageJamFactor2 = 0;
    let averageFreeFlow2 = 0;
    let averageFinalSpeed2 = 0;
    let totalTimeWithDelay2 = 0;
    let totalTimeWithoutDelay2 = 0;
    let c2 = 0;

    let total = 0;

    let speed = 0;
    let jamFactor = 0;
    let freeFlow = 0;
    let finalSpeed = 0;
    let totalTimeWithDelay = 0;
    let totalTimeWithoutDelay = 0;
    let c = 0;

    for (let x = 0; x < labelArray.length - 1; x++) {
      const result0 = analizeEl.traces.results_0[x];
      const result1 = analizeEl.traces.results_1[x];
      const result2 = analizeEl.traces.results_2[x];

      averageSpeed0 += result0.avgSpeed;
      averageSpeed1 += result1.avgSpeed;
      averageSpeed2 += result2.avgSpeed;

      averageJamFactor0 += result0.avgJamFactor;
      averageJamFactor1 += result1.avgJamFactor;
      averageJamFactor2 += result2.avgJamFactor;

      c0 += result0.c;
      c1 += result1.c;
      c2 += result2.c;

      averageFreeFlow0 += result0.avgFreeFlow;
      averageFreeFlow1 += result1.avgFreeFlow;
      averageFreeFlow2 += result2.avgFreeFlow;

      averageFinalSpeed0 += result0.finalSpeed;
      averageFinalSpeed1 += result1.finalSpeed;
      averageFinalSpeed2 += result2.finalSpeed;

      totalTimeWithDelay0 += result0.travelTimeWithDelays;
      totalTimeWithDelay1 += result1.travelTimeWithDelays;
      totalTimeWithDelay2 += result2.travelTimeWithDelays;

      totalTimeWithoutDelay0 += result0.travelTimeWithoutDelays;
      totalTimeWithoutDelay1 += result1.travelTimeWithoutDelays;
      totalTimeWithoutDelay2 += result2.travelTimeWithoutDelays;

      let min = total / 60;

      if (min < 15) {
        total += result0.travelTimeWithDelays;

        speed += result0.avgSpeed;
        jamFactor += result0.avgJamFactor;
        c += result0.c;
        freeFlow += result0.avgFreeFlow;
        finalSpeed += result0.finalSpeed;
        totalTimeWithDelay += result0.travelTimeWithDelays;
        totalTimeWithoutDelay += result0.travelTimeWithoutDelays;
      } else if (min >= 15 && min < 30) {
        total += result1.travelTimeWithDelays;

        speed += result1.avgSpeed;
        jamFactor += result1.avgJamFactor;
        c += result1.c;
        freeFlow += result1.avgFreeFlow;
        finalSpeed += result1.finalSpeed;
        totalTimeWithDelay += result1.travelTimeWithDelays;
        totalTimeWithoutDelay += result1.travelTimeWithoutDelays;
      } else {
        total += result2.travelTimeWithDelays;

        speed += result2.avgSpeed;
        jamFactor += result2.avgJamFactor;
        c += result2.c;
        freeFlow += result2.avgFreeFlow;
        finalSpeed += result2.finalSpeed;
        totalTimeWithDelay += result2.travelTimeWithDelays;
        totalTimeWithoutDelay += result2.travelTimeWithoutDelays;
      }
    }

    const count = labelArray.length;

    averageSpeed0 /= count;
    averageJamFactor0 /= count;
    averageFreeFlow0 /= count;
    averageFinalSpeed0 /= count;
    c0 /= count;

    averageSpeed1 /= count;
    averageJamFactor1 /= count;
    averageFreeFlow1 /= count;
    averageFinalSpeed1 /= count;
    c1 /= count;

    averageSpeed2 /= count;
    averageJamFactor2 /= count;
    averageFreeFlow2 /= count;
    averageFinalSpeed2 /= count;
    c2 /= count;

    speed /= count;
    jamFactor /= count;
    freeFlow /= count;
    finalSpeed /= count;
    c /= count;

    const roadClass0 = getRoadClass(averageFreeFlow0);
    const roadClass1 = getRoadClass(averageFreeFlow1);
    const roadClass2 = getRoadClass(averageFreeFlow2);
    const roadClassFuture = getRoadClass(freeFlow);

    const los0 = getLOSClass(roadClass0, averageFinalSpeed0);
    const los1 = getLOSClass(roadClass1, averageFinalSpeed1);
    const los2 = getLOSClass(roadClass2, averageFinalSpeed2);
    const losFuture = getLOSClass(roadClassFuture, finalSpeed);

    const districts = [];

    traceData.traces.coords.coordinates.forEach((el) => {
      let isIn = false;
      districts.forEach((el2) => {
        if (el.name == el2.name) {
          isIn = true;
        }
      });

      if (!isIn) {
        districts.push({
          name: el.name,
          population_density: el.population_density,
          area: el.area,
        });
      }
    });

    const d = [];

    districts.forEach((el) => {
      let count = 0;
      traceData.traces.coords.distance.forEach((el2) => {
        if (el.name == el2.name) {
          count++;
        }
      });

      const loadIndicator = calculateLoadIndicator(el, cVeh, traceData.type);

      d.push({
        ...el,
        ...loadIndicator,
        count,
      });
    });

    let totalIndicator = 0;
    let count2 = 0;
    d.forEach((el) => {
      totalIndicator += el.loadIndicator;
      count2++;
    });

    setAvgIndicator(totalIndicator);

    const de = [];

    let total2 = 0;
    let total3 = 0;

    d.forEach((el) => {
      let aspeed = 0;
      let ajamFactor = 0;
      let afreeFlow = 0;
      let afinalSpeed = 0;
      let atotalTimeWithDelay = 0;
      let atotalTimeWithoutDelay = 0;
      let ac = 0;

      for (let x = total2; x < total2 + el.count; x++) {
        let min = total3 / 60;
        let obj = {};
        if (min < 15) {
          obj = analizeEl.traces.results_0[x];
        } else if (min >= 15 && min < 30) {
          obj = analizeEl.traces.results_1[x];
        } else if (min >= 30) {
          obj = analizeEl.traces.results_2[x];
        }

        total3 += obj.travelTimeWithDelays;

        aspeed += obj.avgSpeed;
        ajamFactor += obj.avgJamFactor;
        ac += obj.c;
        afreeFlow += obj.avgFreeFlow;
        afinalSpeed += obj.finalSpeed;
        atotalTimeWithDelay += obj.travelTimeWithDelays;
        atotalTimeWithoutDelay += obj.travelTimeWithoutDelays;
      }
      total2 += el.count;

      aspeed /= el.count;
      ajamFactor /= el.count;
      ac /= el.count;
      afreeFlow /= el.count;
      afinalSpeed /= el.count;
      atotalTimeWithDelay /= el.count;
      atotalTimeWithoutDelay /= el.count;

      const road_class = getRoadClass(afreeFlow);
      const los = getLOSClass(road_class, afinalSpeed);

      de.push({
        ...el,
        speed: aspeed,
        jamFactor: ajamFactor,
        c: ac,
        freeFlow: afreeFlow,
        finalSpeed: afinalSpeed,
        travelTimeWithDelays: atotalTimeWithDelay,
        travelTimeWithoutDelays: atotalTimeWithoutDelay,
        los: los,
      });
    });

    setValues({
      time_0: {
        speed: averageSpeed0,
        freeFlow: averageFreeFlow0,
        jamFactor: averageJamFactor0,
        finalSpeed: averageFinalSpeed0,
        travelTimeWithDelays: totalTimeWithDelay0,
        travelTimeWithoutDelays: totalTimeWithoutDelay0,
        c: c0,
        los: los0,
      },
      time_1: {
        speed: averageSpeed1,
        freeFlow: averageFreeFlow1,
        jamFactor: averageJamFactor1,
        finalSpeed: averageFinalSpeed1,
        travelTimeWithDelays: totalTimeWithDelay1,
        travelTimeWithoutDelays: totalTimeWithoutDelay1,
        c: c1,
        los: los1,
      },
      time_2: {
        speed: averageSpeed2,
        freeFlow: averageFreeFlow2,
        jamFactor: averageJamFactor2,
        finalSpeed: averageFinalSpeed2,
        travelTimeWithDelays: totalTimeWithDelay2,
        travelTimeWithoutDelays: totalTimeWithoutDelay2,
        c: c2,
        los: los2,
      },
      future: {
        speed: speed,
        freeFlow: freeFlow,
        jamFactor: jamFactor,
        finalSpeed: finalSpeed,
        travelTimeWithDelays: totalTimeWithDelay,
        travelTimeWithoutDelays: totalTimeWithoutDelay,
        c: c,
        los: losFuture,
      },
      districts: de,
    });

    setData({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_1_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_1_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_1_2 }],
      },
    });

    setData2({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_2_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_2_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_2_2 }],
      },
    });

    setData3({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_3_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_3_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_3_2 }],
      },
    });

    setData4({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_4_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_4_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_4_2 }],
      },
    });

    setData5({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_5_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_5_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_5_2 }],
      },
    });

    setData6({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_6_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_6_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_6_2 }],
      },
    });

    setData7({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_7_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_7_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_7_2 }],
      },
    });

    setData8({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_8_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_8_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_8_2 }],
      },
    });

    setData9({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_9_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_9_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_9_2 }],
      },
    });

    setData10({
      data_0: {
        labels: labelArray,
        datasets: [{ data: data_10_0 }],
      },

      data_1: {
        labels: labelArray,
        datasets: [{ data: data_10_1 }],
      },

      data_2: {
        labels: labelArray,
        datasets: [{ data: data_10_2 }],
      },
    });
  };

  useEffect(() => {
    if (traceData != null && cVeh > 0) {
      if (
        analizeEl == null ||
        analizeEl.traces.trace_id != traceData.traces.trace_id
      ) {
        getData();
      } else {
        setDataAnalize();
      }
    }
  }, [analizeEl, traceData, cVeh]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.post("operations/get-traffic-flow", {
        traceData,
      });
      setAnalizeEl(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (traceData != null) {
      const timeS = traceData.traces.routes[0].timetables.find(
        (el) => el.order == 0
      );
      const timeE = traceData.traces.routes[0].timetables.find(
        (el) => el.order == traceData.traces.routes[0].timetables.length - 1
      );

      const lengthTime = traceData.traces.routes[0].timetables.length;

      const avg = parseInt(lengthTime) / parseInt(18);

      let actualHour = new Date().getHours();

      actualHour = actualHour < 10 ? "0" + actualHour : actualHour;

      let count = 0;

      traceData.traces.routes[0].timetables.forEach((el) => {
        const time = el.time.split(":")[0];

        if (time == actualHour) {
          count++;
        }
      });

      setAveragePerHour(count);

      const cV = count * traceData.capacity;

      setCVeh(cV);

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
    }
  }, [traceData]);

  return (
    traceData != null &&
    analizeEl != null && (
      <View style={[globalStyles.cardZTM]}>
        {loading ? (
          <LoadingTrace text={"Ładowanie danych do analizy!"} />
        ) : (
          <>
            <HeaderCardInfoSmaller
              traceData={traceData}
              text={"Przepływ ruchu"}
              hideAll={hideAll}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
              <Button
                mode={actualDiagramIndex == 0 ? "contained" : "outlined"}
                style={{ width: 120 }}
                labelStyle={{ fontSize: 12 }}
                onPress={() => setActualDiagramIndex(0)}
              >
                Słupkowy
              </Button>
              <Button
                mode={actualDiagramIndex == 1 ? "contained" : "outlined"}
                style={{ width: 100 }}
                labelStyle={{ fontSize: 12 }}
                onPress={() => setActualDiagramIndex(1)}
              >
                Liniowy
              </Button>
            </View>
            <ScrollView style={{ maxHeight: 54, paddingBottom: 10 }} horizontal>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Button
                  mode={type == "speed" ? "contained" : "outlined"}
                  onPress={() => setType("speed")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Prędkość
                </Button>
                <Button
                  mode={type == "confidence" ? "contained" : "outlined"}
                  onPress={() => setType("confidence")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Pewność
                </Button>
                <Button
                  mode={type == "jamFactor" ? "contained" : "outlined"}
                  onPress={() => setType("jamFactor")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Współczynnik zatoru
                </Button>
                <Button
                  mode={type == "freeFlow" ? "contained" : "outlined"}
                  onPress={() => setType("freeFlow")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Prędkość przepływu
                </Button>
                <Button
                  mode={type == "populationDensity" ? "contained" : "outlined"}
                  onPress={() => setType("populationDensity")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Gęstość zaludnienia
                </Button>
                <Button
                  mode={type == "avgLanes" ? "contained" : "outlined"}
                  onPress={() => setType("avgLanes")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Liczba pasów
                </Button>
                <Button
                  mode={type == "c" ? "contained" : "outlined"}
                  onPress={() => setType("c")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Przepustowość
                </Button>
                <Button
                  mode={
                    type == "travelTimeWithDelays" ? "contained" : "outlined"
                  }
                  onPress={() => setType("travelTimeWithDelays")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Czas przejazdu
                </Button>
                <Button
                  mode={type == "totalDelay" ? "contained" : "outlined"}
                  onPress={() => setType("totalDelay")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Opóźnienie
                </Button>
                <Button
                  mode={type == "finalSpeed" ? "contained" : "outlined"}
                  onPress={() => setType("finalSpeed")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Prędkość rzeczywista
                </Button>
              </View>
            </ScrollView>

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
                      {traceData.traces.routes[0].timetables.length}
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

              <Title text={"Przepustowość trasy"} />
              <View style={[style.info2, { margin: 0 }]}>
                <Text
                  style={[
                    style.outfit_bold,
                    style.size_big,
                    { color: Colors.SECOND },
                  ]}
                >
                  {cVeh.toFixed(0)} os/h
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 24,
                  color: Colors.FOURTH,
                }}
              >
                Przejeżdża przez:{" "}
              </Text>
              <View>
                {values != null &&
                  values.districts.length > 0 &&
                  values.districts.map((el, index) => {
                    return (
                      <View key={"DZIELNICE-" + index}>
                        <Text style={style.data}>{el.name}</Text>
                        <View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Gęstość zaludnienia:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {el.population_density} os/km2
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Pole powierzchni:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {el.area} km2
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Współczynnik zatłoczenia:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {el.loadIndicator.toFixed(0)} %
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
              </View>

              <Title text={"Opis Level of Service (LOS)"} />
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 20,
                      color: Colors.PRIMARY,
                    }}
                  >
                    A
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    Minimalne opóźnienia, czas oczekiwania przy sygnalizacji
                    jest bardzo krótki. Płynny ruch, mało zatrzymań, przeważnie
                    brak kolejek.
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 20,
                      color: Colors.PRIMARY,
                    }}
                  >
                    B
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    Krótkie opóźnienia, lekkie zatrzymania, sporadyczne kolejki
                    przy sygnalizacji, ale ruch jest nadal dość płynny.
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 20,
                      color: Colors.PRIMARY,
                    }}
                  >
                    C
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    Umiarkowane opóźnienia, wyraźnie odczuwalny wpływ
                    sygnalizacji świetlnej, ruch zaczyna być mniej płynny,
                    kolejki są widoczne, ale akceptowalne.
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 20,
                      color: Colors.PRIMARY,
                    }}
                  >
                    D
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    Większe opóźnienia, ruch zaczyna być bardziej przerywany,
                    dłuższe kolejki, sygnalizacja ma istotny wpływ na płynność
                    ruchu.
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 20,
                      color: Colors.PRIMARY,
                    }}
                  >
                    E
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    Bardzo duże opóźnienia, znaczne zatrzymania i długie
                    kolejki, zbliżające się do granic przepustowości
                    skrzyżowania.
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 20,
                      color: Colors.PRIMARY,
                    }}
                  >
                    F
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    Nieakceptowalne opóźnienia, bardzo długie kolejki,
                    sygnalizacja świetlna przeciążona, a ruch jest poważnie
                    zakłócony. Pojazdy mogą czekać na kilku cyklach
                    sygnalizacji, aby przejechać.
                  </Text>
                </View>
              </View>

              <Title text={"Wartości na całą trasę"} />
              {values != null && (
                <View>
                  <View>
                    <Text style={style.data}>Aktualnie</Text>
                    <View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Prędkość:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_0.speed * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przpływ ruchu:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_0.freeFlow * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Prędkość rzeczywista:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_0.finalSpeed * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Współczynnik zatoru:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_0.jamFactor.toFixed(2)}
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przepustowość:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_0.c.toFixed(0)} poj/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Czas podróży (bez opóźnień):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_0.travelTimeWithoutDelays / 60).toFixed(
                            0
                          )}{" "}
                          min
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Czas podróży (z opóźnieniami):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_0.travelTimeWithDelays / 60).toFixed(0)}{" "}
                          min
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Level of Service (LOS):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: colorLOS[values.time_0.los],
                          }}
                        >
                          {values.time_0.los}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={style.data}>Za 15 minut</Text>
                    <View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Prędkość:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_1.speed * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przpływ ruchu:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_1.freeFlow * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Prędkość rzeczywista:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_1.finalSpeed * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Współczynnik zatoru:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_1.jamFactor.toFixed(2)}
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przepustowość:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_1.c.toFixed(0)} poj/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Czas podróży (bez opóźnień):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_1.travelTimeWithoutDelays / 60).toFixed(
                            0
                          )}{" "}
                          min
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Czas podróży (z opóźnieniami):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_1.travelTimeWithDelays / 60).toFixed(0)}{" "}
                          min
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Level of Service (LOS):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: colorLOS[values.time_1.los],
                          }}
                        >
                          {values.time_1.los}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={style.data}>Za 30 minut</Text>
                    <View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Prędkość:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_2.speed * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przpływ ruchu:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_2.freeFlow * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Prędkość rzeczywista:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_2.finalSpeed * 3.6).toFixed(0)} km/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Współczynnik zatoru:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_2.jamFactor.toFixed(2)}
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przepustowość:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_2.c.toFixed(0)} poj/h
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Czas podróży (bez opóźnień):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_2.travelTimeWithoutDelays / 60).toFixed(
                            0
                          )}{" "}
                          min
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Czas podróży (z opóźnieniami):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {(values.time_2.travelTimeWithDelays / 60).toFixed(0)}{" "}
                          min
                        </Text>
                      </View>
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Level of Service (LOS):{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: colorLOS[values.time_2.los],
                          }}
                        >
                          {values.time_2.los}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              <Title text={"Przewidywane wartości"} />
              {values != null && (
                <View>
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Prędkość:{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {(values.future.speed * 3.6).toFixed(0)} km/h
                    </Text>
                  </View>
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Przpływ ruchu:{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {(values.future.freeFlow * 3.6).toFixed(0)} km/h
                    </Text>
                  </View>
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Prędkość rzeczywista:{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {(values.future.finalSpeed * 3.6).toFixed(0)} km/h
                    </Text>
                  </View>
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Współczynnik zatoru:{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {values.future.jamFactor.toFixed(2)}
                    </Text>
                  </View>
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Przepustowość:{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {values.future.c.toFixed(0)} poj/h
                    </Text>
                  </View>
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Czas podróży (bez opóźnień):{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {(values.future.travelTimeWithoutDelays / 60).toFixed(0)}{" "}
                      min
                    </Text>
                  </View>
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Czas podróży (z opóźnieniami):{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {(values.future.travelTimeWithDelays / 60).toFixed(0)} min
                    </Text>
                  </View>
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Level of Service (LOS):{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: colorLOS[values.future.los],
                      }}
                    >
                      {values.future.los}
                    </Text>
                  </View>
                </View>
              )}
              <Title text={"Dzielnice"} />

              <View>
                {values != null &&
                  values.districts.length > 0 &&
                  values.districts.map((el, index) => {
                    return (
                      <View key={"DZIELNICE-" + index}>
                        <Text style={style.data}>{el.name}</Text>
                        <View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Prędkość:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {(el.speed * 3.6).toFixed(0)} km/h
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Przpływ ruchu:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {(el.freeFlow * 3.6).toFixed(0)} km/h
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Prędkość rzeczywista:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {(el.finalSpeed * 3.6).toFixed(0)} km/h
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Współczynnik zatoru:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {el.jamFactor.toFixed(2)}
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Przepustowość:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {el.c.toFixed(0)} poj/h
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Czas podróży (bez opóźnień):{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {(el.travelTimeWithoutDelays / 60).toFixed(0)} min
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Czas podróży (z opóźnieniami):{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {(el.travelTimeWithDelays / 60).toFixed(0)} min
                            </Text>
                          </View>
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Level of Service (LOS):{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: colorLOS[el.los],
                              }}
                            >
                              {el.los}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
              </View>

              <Title text={"Analiza przepustowości drogi"} />

              <Diagrams
                data={data}
                data2={data2}
                data3={data3}
                data4={data4}
                data5={data5}
                data6={data6}
                data7={data7}
                data8={data8}
                data9={data9}
                data10={data10}
                type={type}
                actualTime={actualTime}
                actualDiagramIndex={actualDiagramIndex}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  marginVertical: 20,
                }}
              >
                <AntDesign
                  onPress={() => setMove("left")}
                  name="arrowleft"
                  size={24}
                  color="black"
                />
                {actualTime == 0 && (
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontFamily: "outfit-medium",
                      fontSize: 18,
                    }}
                  >
                    Aktualny czas
                  </Text>
                )}
                {actualTime > 0 && (
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontFamily: "outfit-medium",
                      fontSize: 18,
                    }}
                  >
                    +{actualTime * 15} min
                  </Text>
                )}
                <AntDesign
                  onPress={() => setMove("right")}
                  name="arrowright"
                  size={24}
                  color="black"
                />
              </View>

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

  data: {
    fontFamily: "outfit-medium",
    color: Colors.THIRD,
    fontSize: 20,
    marginVertical: 10,
  },

  data_box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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

export default TrafficFlowCardInfo;
