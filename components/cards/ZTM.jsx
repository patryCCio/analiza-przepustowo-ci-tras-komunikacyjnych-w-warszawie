import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setOtherLayers } from "../../context/redux/reducers/layersSlice";
import ZTMCard from "./ZTMCard";

const ZTM = () => {
  const { isCardZTM } = useSelector((state) => state.root.layers);
  const dispatch = useDispatch();

  const handlePressShow = () => {
    dispatch(setOtherLayers({ choice: "cardZTM", data: !isCardZTM }));
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          width: 63,
          height: 63,
          top: 80,
          right: 20,
          borderRadius: 20,
          backgroundColor: isCardZTM ? Colors.PRIMARY : "white",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
          shadowColor: "#000",
          zIndex: 210,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity onPress={handlePressShow}>
          <MaterialIcons
            name="alt-route"
            size={34}
            color={isCardZTM ? "white" : Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>

      {isCardZTM && <ZTMCard />}
    </>
  );
};

export default ZTM;
