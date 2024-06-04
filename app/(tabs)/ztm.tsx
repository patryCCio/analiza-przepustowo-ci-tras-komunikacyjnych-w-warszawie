import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const ztm = () => {
  const [lines, setLines] = useState([]);

  const getLinesData = async () => {
    if (lines.length != 0) return;

    // const data = await axios.get("");
  };

  useEffect(() => {
    getLinesData();
  }, []);

  return lines.length > 0 ? (
    <View>
      <Text>ZTM</Text>
    </View>
  ) : (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default ztm;
