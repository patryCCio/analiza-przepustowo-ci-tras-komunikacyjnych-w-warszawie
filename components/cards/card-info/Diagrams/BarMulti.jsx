import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import LoadingCard from "../../../LoadingCard";
import { Colors } from "../../../../constants/Colors";

const BarMulti = ({ suffix, data, d, textDiagram }) => {
  const [isData, setIsData] = useState(false);

  const [color, setColor] = useState(Colors.PRIMARY);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (data) {

      if (suffix == "km/h"){
        setWidth(10);
      } else if (suffix == "os/km2"){
        setWidth(-18);
      } else if (suffix == "%"){
        setWidth(25);
      } else if (suffix == ""){
        setWidth(30);
      } else if (suffix == "n"){
        setWidth(20);
      }

      if (d == 0) {
        setColor(Colors.PRIMARY);
      } else if (d == 1) {
        setColor("green");
      } else if (d == 2) {
        setColor("tomato");
      }
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data]);

  return isData ? (
    <>
      <Text style={{ fontFamily: "outfit", fontSize: 16 }}>{textDiagram}</Text>
      <ScrollView horizontal>
        <BarChart
          data={data}
          width={
            data.labels.length < 8
              ? Dimensions.get("window").width - 40
              : data.labels.length * 60
          }
          height={200}
          yAxisSuffix={suffix}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 0,
            color: (opacity = 1) => color,
            labelColor: (opacity = 1) => color,
            style: {
              borderRadius: 8,
            },
            propsForVerticalLabels: {
              fontSize: 10,
            },
            propsForHorizontalLabels: {
              fontSize: 14,
              fontFamily: "outfit-bold",
            },
            barPercentage: 0.6,
          }}
          style={{
            marginTop: 10,
            borderRadius: 16,
            paddingBottom: 30,
          }}
          verticalLabelRotation={90}
          xLabelsOffset={-20}
          yLabelsOffset={width}
          fromZero={true}
        />
      </ScrollView>
    </>
  ) : (
    <View style={{ position: "relative", width: "100%", height: 250 }}>
      <LoadingCard />
    </View>
  );
};

export default BarMulti;
