import { useEffect } from "react";
import api from "../../api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setDistricts } from "../../context/redux/reducers/callsSlice.js";
import { Polygon } from "react-native-maps";

const Borders = () => {
  const { districts } = useSelector((state) => state.root.data);
  const { isDistrictMap } = useSelector((state) => state.root.layers);

  const dispatch = useDispatch();

  const getBorders = async () => {
    if (!isDistrictMap) return;
    if (districts.length != 0) return;
    try {
      const result = await api.get(
        process.env.EXPO_PUBLIC_API_URL + "districts/districts-info"
      );

      dispatch(setDistricts(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBorders();
  }, [isDistrictMap]);

  if (isDistrictMap && districts.length > 0)
    return districts.map((el, index) => {
      if (el.border_coords.length > 0) {
        return (
          <Polygon
            key={index}
            fillColor="rgba(0,0,0,0.2)"
            style={{ opacity: 0.3 }}
            coordinates={el.border_coords.map((c) => {
              return { longitude: c.longitude, latitude: c.latitude };
            })}
          />
        );
      }
    });
};

export default Borders;
