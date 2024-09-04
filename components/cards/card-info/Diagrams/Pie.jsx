import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Colors } from "../../../../constants/Colors";
import LoadingCard from "../../../LoadingCard";

const Pie = ({ data, labels, textDiagram }) => {
  const [isData, setIsData] = useState(false);

  const pieChartData = data.map((value, index) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const randomColor = `rgb(${r},${g},${b})`;

    return {
      name: labels[index],
      population: value,
      color: randomColor,
      legendFontColor: Colors.PRIMARY,
      legendFontSize: 14,
    };
  });

  useEffect(() => {
    if (data.length > 0 && labels.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data, labels]);

  return isData ? (
    <View>
      <Text style={{ fontFamily: "outfit", fontSize: 16 }}>{textDiagram}</Text>

      {/* Wykres kołowy */}
      <PieChart
        data={pieChartData}
        width={Dimensions.get("window").width - 40}
        height={300} // Rozmiar wykresu
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          color: (opacity = 1) => Colors.SECOND,
          labelColor: (opacity = 1) => Colors.PRIMARY,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        hasLegend={false}
        paddingLeft={"90"}
      />

      {/* Legendę umieszczamy poniżej wykresu */}
      <ScrollView style={{ marginTop: 20 }}>
        {pieChartData.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: item.color,
                marginRight: 10,
              }}
            />

            <Text
              style={{
                color: item.legendFontColor,
                fontSize: item.legendFontSize,
              }}
            >
              {item.name}
            </Text>
            <Text>{" (" + item.population + ")"}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  ) : (
    <View style={{ position: "relative", width: "100%", height: 250 }}>
      <LoadingCard />
    </View>
  );
};

export default Pie;
