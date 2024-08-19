import CardInfo from "./CardInfo";
import CardSettings from "./CardSettings";
import CardSearch from "./CardSearch";
import CardRouted from "./CardRouted";
import CardZTM from "./ZTMCardInfo";
import { useDispatch, useSelector } from "react-redux";
import ZTMCard from "./ZTMCard";

const Cards = () => {
  const { followGPS, isLocationActive, isRouted } = useSelector(
    (state) => state.root.location
  );

  const { settingsCard, searchCard, ztmCard, stopCard, ztmCardInfo } =
    useSelector((state) => state.root.cards);

  const { isCardInfoZTM } = useSelector((state) => state.root.settings);
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

      {ztmCardInfo && <CardZTM />}
      {ztmCard && <ZTMCard />}
    </>
  );
};

export default Cards;
