import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useSelector } from "react-redux";

const CurrentLocation = () => {
  const { location } = useSelector((state) => state.root.location);

  return (
    <Marker
      coordinate={{
        longitude: parseFloat(location.coords.longitude),
        latitude: parseFloat(location.coords.latitude),
      }}
    >
      <MaterialCommunityIcons
        name="human-handsdown"
        size={36}
        color={Colors.PRIMARY}
      />
    </Marker>
  );
};

export default CurrentLocation;
