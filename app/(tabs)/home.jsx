import { useDispatch, useSelector } from "react-redux";
import MapComponent from "../../components/MapComponent";
import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import Loading from "../../components/Loading";
import {
  setVehicles,
  setStops,
  setDistricts,
} from "../../context/redux/reducers/mainSlice";
import { Button, Dialog, PaperProvider, Portal } from "react-native-paper";
import { MapContext } from "../../context/MapContext";
import { Text } from "react-native";

const home = () => {
  const { vehicles, stops, districts } = useSelector(
    (state) => state.root.data
  );

  const { showDialog, setShowDialog, textDialog, titleDialog } =
    useContext(MapContext);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      if (vehicles.length == 0) {
        const result = await api.get("vehicles/all");
        dispatch(setVehicles(result.data));
      }

      if (stops.length == 0) {
        const result = await api.get("stops/all");
        dispatch(setStops(result.data));
      }

      if (districts.length == 0) {
        const result = await api.get("districts/districts-info");
        dispatch(setDistricts(result.data));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <PaperProvider>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>{titleDialog}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{textDialog}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Okej!</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <MapComponent />
    </PaperProvider>
  );
};

export default home;
