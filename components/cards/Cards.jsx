import CardInfo from "./CardInfo";
import CardSettings from "./CardSettings";
import CardSearch from "./CardSearch";
import ZTMCardInfo from "./card-info/ZTMCardInfo";
import { useSelector } from "react-redux";
import ZTMCard from "./ZTMCard";
import DistrictCardInfo from "./card-info/DistrictCardInfo";
import TrafficFlowCardInfo from "./card-info/TrafficFlowCardInfo";
import ShortestPathCard from "./ShortestPathCard";
import ShortestPathCardArray from "./ShortestPathCardArray";

const Cards = () => {
  const { settingsCard, searchCard, ztmCard, stopCard, ztmCardInfo, shortestPathCard, shortestPathCardArray } =
    useSelector((state) => state.root.cards);

  const { routeNormal, routeFlow, routeDistrict } = useSelector(
    (state) => state.root.settings
  );

  return (
    <>
      {stopCard && <CardInfo />}
      {settingsCard && <CardSettings />}
      {searchCard && <CardSearch />}

      {ztmCardInfo && routeNormal && <ZTMCardInfo />}
      {ztmCardInfo && routeFlow && <TrafficFlowCardInfo />}
      {ztmCardInfo && routeDistrict && <DistrictCardInfo />}
      {ztmCard && <ZTMCard />}

      {shortestPathCard && <ShortestPathCard />}
      {shortestPathCardArray && <ShortestPathCardArray />}
    </>
  );
};

export default Cards;
