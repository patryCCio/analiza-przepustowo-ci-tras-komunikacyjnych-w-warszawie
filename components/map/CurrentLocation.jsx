import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";

const CurrentLocation = () => {
  const { location } = useContext(MapContext);

  if (location) {
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
  } else return null;
};

export default CurrentLocation;
