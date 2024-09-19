import { ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../../constants/Globals";
import { Colors } from "../../../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../../context/MapContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Title from "../Title";
import { useSelector } from "react-redux";
import api from "../../../api/api";
import { Button } from "react-native-paper";
import LoadingTrace from "../../LoadingTrace";
import Diagrams from "./Diagrams/Diagrams";
import HeaderCardInfoSmaller from "./HeaderCardInfoSmaller";
import Los from "./Los";

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
  const [values, setValues] = useState(null);
  const [actualTime, setActualTime] = useState(0);

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
  const [data11, setData11] = useState([]);

  const [type, setType] = useState("speed");

  const [loading, setLoading] = useState(false);

  const [cVeh, setCVeh] = useState(0);
  const [losHour, setLosHours] = useState("A");

  const [hourActivity, setHourActivity] = useState(0);
  const [averagePerHour, setAveragePerHour] = useState(0);
  const [averagePerDay, setAveragePerDay] = useState(0);

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

  const setDataAnalize = async () => {
    const labelArray = [];
    traceData.traces.routes.forEach((el) => {
      stops.forEach((el2) => {
        if (el.stop_id == el2.id) {
          labelArray.push(el2.name + " " + el2.number_of_stop);
        }
      });
    });

    labelArray.shift();

    setLoading(true);
    try {
      const res = await api.post("operations/get-traffic-analize-data", {
        labelArray,
        analizeEl,
        traceData,
      });

      const v = res.data;
      const l = v.data;

      setData(l.data1);
      setData2(l.data2);
      setData3(l.data3);
      setData4(l.data4);
      setData5(l.data5);
      setData6(l.data6);
      setData7(l.data7);
      setData8(l.data8);
      setData9(l.data9);
      setData10(l.data10);
      setData11(l.data11);

      setValues(v.values);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (analizeEl != null) {
      setDataAnalize();
    }
  }, [analizeEl]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.post("operations/get-traffic-flow", {
        traceData,
        stops,
      });
      setAnalizeEl(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getLineCapacity = async () => {
    setLoading(true);
    try {
      const res = await api.post("operations/get-line-capacity", {
        traceData,
      });

      setCVeh(res.data.cVeh.toFixed(0));
      setHourActivity(res.data.hourActivity);
      setAveragePerHour(res.data.averagePerHour.toFixed(2));
      setAveragePerDay(res.data.averagePerDay.toFixed(2));
      setLosHours(res.data.losHour);

      setTimes(res.data.times);

      setRouteInfo(res.data.routeInfo);

      getData();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (traceData != null) {
      getLineCapacity();
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
                  mode={type == "cVehS" ? "contained" : "outlined"}
                  onPress={() => setType("cVehS")}
                  labelStyle={{ fontSize: 12 }}
                >
                  Przep. Pojazdu
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
                  {traceData.capacity} osób
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
                <Text style={{fontFamily: 'outfit-bold'}}>
                  {"(" + hourActivity  + " h)"}
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
                      {averagePerDay}
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
                  {cVeh} os/h
                </Text>
              </View>

              <View style={[style.info2, { margin: 0 }]}>
                <Text
                  style={[
                    style.outfit_bold,
                    style.size_big,
                    { color: Colors.SECOND },
                  ]}
                >
                  Hour of Service:
                </Text>
                <Text
                  style={[
                    style.outfit_bold,
                    style.size_big,
                    { color: colorLOS[losHour] },
                  ]}
                >
                  {losHour}
                </Text>
              </View>

              <Los />

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
                          Przepustowość skrzyżowań:{" "}
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
                          LOS dla skrzyżowań:{" "}
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
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przepustowość pojazdu:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_0.cVehS.toFixed(0)} veh/h
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
                          Przepustowość skrzyżowań:{" "}
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
                          LOS dla skrzyżowań:{" "}
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
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przepustowość pojazdu:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_1.cVehS.toFixed(0)} veh/h
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
                          Przepustowość skrzyżowań:{" "}
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
                          LOS dla skrzyżowań:{" "}
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
                      <View style={style.data_box}>
                        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                          Przepustowość pojazdu:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "outfit-bold",
                            fontSize: 18,
                            color: Colors.PRIMARY,
                          }}
                        >
                          {values.time_2.cVehS.toFixed(0)} veh/h
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
                      Przepustowość skrzyżowań:{" "}
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
                      LOS dla skrzyżowań:{" "}
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
                  <View style={style.data_box}>
                    <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
                      Przepustowość pojazdu:{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 18,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {values.future.cVehS} veh/h
                    </Text>
                  </View>
                </View>
              )}
              <Title text={"Dzielnice aktualnie"} />

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
                              Przepustowość skrzyżowań:{" "}
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
                              LOS dla skrzyżowań:{" "}
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
                          <View style={style.data_box}>
                            <Text
                              style={{ fontFamily: "outfit", fontSize: 16 }}
                            >
                              Przepustowość pojazdu:{" "}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "outfit-bold",
                                fontSize: 18,
                                color: Colors.PRIMARY,
                              }}
                            >
                              {el.cVehS} veh/h
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
              </View>

              <Title text={"Wykresy"} />

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
                data11={data11}
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
