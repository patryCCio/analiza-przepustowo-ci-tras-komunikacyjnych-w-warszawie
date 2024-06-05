import axios from "axios";
import { Link } from "expo-router";
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

  return (
    <View>
      <Link href="ztmInfo">
        <Text>ztmInfo</Text>
      </Link>
    </View>
  );
};

export default ztm;
