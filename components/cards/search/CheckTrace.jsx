import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";

const CheckTrace = ({
  setText,
  handleCheckPress,
  type,
  searchResult,
  setSearchResult,
  checkTo,
  checkFrom,
  searchOption,
  actualIndex,
}) => {
  const hide = () => {
    setSearchResult([]);
    setText("");
  };

  const handlePress = (el) => {
    setSearchResult([]);
    handleCheckPress(el, type);
  };

  const [top, setTop] = useState(0);

  useEffect(() => {
    if (searchOption) {
      if (checkFrom || checkTo){
        setTop(260);
      } else {
        setTop(160);
      }
      
    } else {
      if (checkTo != null) {
        setTop(180);
      } else {
        setTop(160);
      }
    }
  }, [searchOption, actualIndex, checkFrom, checkTo]);

  return (
    <ScrollView
      style={{
        position: "absolute",
        top: top,
        left: 10,
        width: "100%",
        backgroundColor: Colors.FOURTH,
        height: 160,
        zIndex: 101,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.45,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <TouchableOpacity onPress={hide}>
        <Feather
          name="x"
          size={24}
          style={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
          color={Colors.PRIMARY}
        />
      </TouchableOpacity>

      <View
        style={{
          width: "100%",
          height: "100%",
          padding: 10,
          marginTop: 50,
          gap: 10,
          position: "relative",
        }}
      >
        {searchResult.length > 0 &&
          searchResult.map((el, index) => {
            return (
              <TouchableOpacity key={index}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "outfit-medium",
                    backgroundColor: Colors.THIRD,
                    padding: 5,
                  }}
                  onPress={() => handlePress(el)}
                >
                  {el.display_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default CheckTrace;
