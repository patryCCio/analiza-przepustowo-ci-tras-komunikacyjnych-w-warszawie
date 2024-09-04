import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Colors } from "../../../../constants/Colors";
import LoadingCard from "../../../LoadingCard";

const Line = ({ suffix, data, labels, textDiagram }) => {
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    if (data.length > 0 && labels.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data, labels]);

  return isData ? (
    <>
      <Text style={{ fontFamily: "outfit", fontSize: 16 }}>{textDiagram}</Text>
      <ScrollView horizontal>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={
            data.length < 8
              ? Dimensions.get("window").width - 40
              : data.length * 40
          }
          height={400}
          yAxisSuffix={suffix}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 0,
            color: (opacity = 1) => Colors.SECOND,
            labelColor: (opacity = 1) => Colors.PRIMARY,
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
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: Colors.FOURTH,
            },
          }}
          bezier
          style={{
            marginTop: 10,
            borderRadius: 16,
            paddingBottom: 30,
          }}
          verticalLabelRotation={90}
          xLabelsOffset={-20}
          yLabelsOffset={20}
        />
      </ScrollView>
    </>
  ) : (
    <View style={{ position: "relative", width: "100%", height: 250 }}>
      <LoadingCard />
    </View>
  );
};

export default Line;
