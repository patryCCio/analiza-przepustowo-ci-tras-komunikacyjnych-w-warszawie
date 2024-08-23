import CardInfo from "./CardInfo";
import CardSettings from "./CardSettings";
import CardSearch from "./CardSearch";
import CardRouted from "./CardRouted";
import ZTMCardInfo from "./card-info/ZTMCardInfo";
import { useDispatch, useSelector } from "react-redux";
import ZTMCard from "./ZTMCard";
import DistrictCardInfo from "./card-info/DistrictCardInfo";
import TrafficFlowCardInfo from "./card-info/TrafficFlowCardInfo";
import TrafficFlowFutureCardInfo from "./card-info/TrafficFlowFutureCardInfo";

const Cards = () => {
  const { followGPS, isLocationActive, isRouted } = useSelector(
    (state) => state.root.location
  );

  const { settingsCard, searchCard, ztmCard, stopCard, ztmCardInfo } =
    useSelector((state) => state.root.cards);

  const { routeNormal, routeFlow, routeFlowFuture, routeDistrict } = useSelector((state) => state.root.settings);
  const { isRide } = useSelector((state) => state.root.routes);

  const dispatch = useDispatch();

  return (
    <>
      {stopCard && <CardInfo />}
      {settingsCard && <CardSettings />}
      {searchCard && <CardSearch />}
      {/* {isRouted && <CardRouted hideAll={hideAll} />} */}
      {/* {isRide && (
        <CardRide hideAll={hideAll} stopIntervalMain={stopIntervalMain} />
      )} */}

      {ztmCardInfo && routeNormal && <ZTMCardInfo />}
      {ztmCardInfo && routeFlow && <TrafficFlowCardInfo />}
      {ztmCardInfo && routeFlowFuture && <TrafficFlowFutureCardInfo />}
      {ztmCardInfo && routeDistrict && <DistrictCardInfo />}
      {ztmCard && <ZTMCard />}
    </>
  );
};

export default Cards;
