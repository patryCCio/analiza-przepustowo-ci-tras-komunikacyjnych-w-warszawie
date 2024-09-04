import { Marker } from "react-native-maps";
import { Image, View } from "react-native";
import accidentsSource from "../../assets/images/road_block.png";
import anomaliesSource from "../../assets/images/accident.png";
import partialsSource from "../../assets/images/partial.png";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { isCoordinateInRegion } from "../../context/redux/functions";

const Accidents = () => {
  const { accidents, anomalies, partials } = useSelector(
    (state) => state.root.data
  );
  const { region } = useContext(MapContext);

  const [show, setShow] = useState(false);

  useEffect(() => {
    let zoomLevel =
      Math.log2(360 / Math.max(region.latitudeDelta, region.longitudeDelta)) +
      1;

    if (zoomLevel <= 12.5) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [region]);

  return (
    <>
      {show &&
        accidents.map((el, index) => {
          if (region && isCoordinateInRegion(el, region)) {
            return (
              <Marker
                key={"Accidents-" + index}
                title="Droga zablokowana"
                coordinate={{ latitude: el.latitude, longitude: el.longitude }}
              >
                <View>
                  <Image
                    style={{ width: 32, height: 32 }}
                    source={accidentsSource}
                  />
                </View>
              </Marker>
            );
          }
        })}
      {show &&
        anomalies.map((el, index) => {
          if (region && isCoordinateInRegion(el, region)) {
            return (
              <Marker
                key={"Anomalies-" + index}
                title="Możliwy wypadek"
                coordinate={{ latitude: el.latitude, longitude: el.longitude }}
              >
                <View>
                  <Image
                    style={{ width: 32, height: 32 }}
                    source={anomaliesSource}
                  />
                </View>
              </Marker>
            );
          }
        })}
      {show &&
        partials.map((el, index) => {
          if (region && isCoordinateInRegion(el, region)) {
            return (
              <Marker
                key={"Partials-" + index}
                title="Utrudnienia w ruchu"
                coordinate={{ latitude: el.latitude, longitude: el.longitude }}
              >
                <View>
                  <Image
                    style={{ width: 32, height: 32 }}
                    source={partialsSource}
                  />
                </View>
              </Marker>
            );
          }
        })}
    </>
  );
};

export default Accidents;
