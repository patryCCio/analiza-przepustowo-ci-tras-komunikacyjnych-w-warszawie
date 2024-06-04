import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile, Polyline, Polygon, Marker } from "react-native-maps";
import Cards from "./cards/Cards";
import { MapContext } from "../context/MapContext";
import Markers from "./map/Markers";
import Traces from "./map/Traces";
import CurrentLocation from "./map/CurrentLocation";
import * as Location from "expo-location";
import { Text } from "react-native";

const MapComponent = () => {
  const {
    mapRef,
    region,
    setRegion,
    wantToShareLocation,
    setLocation,
    location,
    fitsToCoordsHigher,
    followLocation,
  } = useContext(MapContext);

  const [coords, setCoords] = useState([
    {
      id: 1,
      name: "Bemowo",
      pinLatitude: 52.241194133814794, 
      pinLongitude: 20.911115798468742,
      border_coords: [
        {
          id: 1,
          latitude: 52.20926520437598,
          longitude: 20.870736442233774,
        },
        {
          id: 1,
          latitude: 52.20895477184586,
          longitude: 20.870994506701177,
        },
        { id: 1, latitude: 52.20930021291767, longitude: 20.88085695466502 },
        { id: 1, latitude: 52.21443961650765, longitude: 20.914379637319858 },
        { id: 1, latitude: 52.217172608239395, longitude: 20.915411062972904 },
        { id: 1, latitude: 52.219798001715645, longitude: 20.92382124922738 },
        { id: 1, latitude: 52.22862952000526, longitude: 20.920911599058016 },
        { id: 1, latitude: 52.241978833058205, longitude: 20.925043611605073 },
        { id: 1, latitude: 52.249857983043334, longitude: 20.937758421868562 },
        { id: 1, latitude: 52.255214846616525, longitude: 20.94703945059227 },
        { id: 1, latitude: 52.25700229235294, longitude: 20.946526893730216 },
        { id: 1, latitude: 52.26278149374645, longitude: 20.951860701821204 },
        { id: 1, latitude: 52.26699278746872, longitude: 20.940013962103436 },
        { id: 1, latitude: 52.27741362963241, longitude: 20.89277661018494 },
        { id: 1, latitude: 52.28067302911132, longitude: 20.88882528618516 },
        { id: 1, latitude: 52.280147430830574, longitude: 20.887278722728198 },
        { id: 1, latitude: 52.28014749733764, longitude: 20.88521675293352 },
        { id: 1, latitude: 52.279411590175116, longitude: 20.880577349752528 },
        { id: 1, latitude: 52.26500872628821, longitude: 20.87834489229839 },
        { id: 1, latitude: 52.250397386703824, longitude: 20.8634130121458 },
        { id: 1, latitude: 52.24692471052238, longitude: 20.891058142823276 },
        { id: 1, latitude: 52.24366500988891, longitude: 20.89363149287966 },
        { id: 1, latitude: 52.23210153936657, longitude: 20.89001862551124 },
        { id: 1, latitude: 52.23210325435279, longitude: 20.87954822986913 },
        { id: 1, latitude: 52.231787960979155, longitude: 20.878861480113944 },
        { id: 1, latitude: 52.228634746146675, longitude: 20.872681106250727 },
        { id: 1, latitude: 52.22558582348578, longitude: 20.873366847790056 },
      ],
    },
    {
      id: 2,
      name: "Wola",
      pinLatitude: 52.23306857759133, 
      pinLongitude: 20.95681940686419,
      border_coords: [
        { id: 2, latitude: 52.21443961650765, longitude: 20.914379637319858 },
        { id: 2, latitude: 52.217172608239395, longitude: 20.915411062972904 },
        { id: 2, latitude: 52.219798001715645, longitude: 20.92382124922738 },
        { id: 2, latitude: 52.22862952000526, longitude: 20.920911599058016 },
        { id: 2, latitude: 52.241978833058205, longitude: 20.925043611605073 },
        { id: 2, latitude: 52.249857983043334, longitude: 20.937758421868562 },
        { id: 2, latitude: 52.255214846616525, longitude: 20.94703945059227 },
        { id: 2, latitude: 52.254681140655926, longitude: 20.951409552430977 },
        { id: 2, latitude: 52.25572639024137, longitude: 20.960990323147577 },
        { id: 2, latitude: 52.25438717708059, longitude: 20.965361311172128 },
        { id: 2, latitude: 52.25928908499541, longitude: 20.980061552895798 },
        { id: 2, latitude: 52.227990400152464, longitude: 21.00103110086633 },
        { id: 2, latitude: 52.21825760472648, longitude: 20.959636872654926 },
        { id: 2, latitude: 52.21743825504804, longitude: 20.957938050325474 },
        { id: 2, latitude: 52.21431493426451, longitude: 20.95223350256085 },
        { id: 2, latitude: 52.21454943972607, longitude: 20.94298088675664 },
        { id: 2, latitude: 52.21192409251074, longitude: 20.933727881320287 },
        { id: 2, latitude: 52.21004956408065, longitude: 20.923010392531786 },
      ],
    },
    {
      id: 3,
      name: "Ochota",
      pinLatitude: 52.21027239801556, 
      pinLongitude: 20.970992303368426,
      border_coords: [
        { id: 3, latitude: 52.227990400152464, longitude: 21.00103110086633 },
        { id: 3, latitude: 52.21825760472648, longitude: 20.959636872654926 },
        { id: 3, latitude: 52.21743825504804, longitude: 20.957938050325474 },
        { id: 3, latitude: 52.21431493426451, longitude: 20.95223350256085 },
        {
          id: 3,
          latitude: 52.21454943972607,
          longitude: 20.94298088675664,
        },
        {
          id: 3,
          latitude: 52.21192409251074,
          longitude: 20.933727881320287,
        },
        {
          id: 3,
          latitude: 52.2017731558781,
          longitude: 20.944665806983174,
        },
        {
          id: 3,
          latitude: 52.19283672577799,
          longitude: 20.98239408843717,
        },
        {
          id: 3,
          latitude: 52.20995343594764,
          longitude: 20.988360674992514,
        },
        {
          id: 3,
          latitude: 52.209144961179476,
          longitude: 20.9984573580671,
        },
        {
          id: 3,
          latitude: 52.21050825416022,
          longitude: 21.006186243855478,
        },
        {
          id: 3,
          latitude: 52.222984426148614,
          longitude: 21.004117916384597,
        },
      ],
    },
    {
      id: 4,
      name: "Śródmieście",
      pinLatitude: 52.22968288478936, 
      pinLongitude: 21.011981728568458,
      border_coords: [
        { id: 4, latitude: 52.21050825416022, longitude: 21.006186243855478 },
        { id: 4, latitude: 52.222984426148614, longitude: 21.004117916384597 },
        { id: 4, latitude: 52.227990400152464, longitude: 21.00103110086633 },
        { id: 4, latitude: 52.25928908499541, longitude: 20.980061552895798 },
        { id: 4, latitude: 52.25921750000523, longitude: 21.00218364388682 },
        { id: 4, latitude: 52.26154842706568, longitude: 21.010268668934167 },
        { id: 4, latitude: 52.24870750496108, longitude: 21.022237649466668 },
        { id: 4, latitude: 52.238926248308886, longitude: 21.037536890866868 },
        { id: 4, latitude: 52.22573140996712, longitude: 21.049720595530275 },
        { id: 4, latitude: 52.22057954597261, longitude: 21.058995357561205 },
        { id: 4, latitude: 52.21942192181367, longitude: 21.063887143123615 },
        { id: 4, latitude: 52.21674068527636, longitude: 21.061568555848996 },
        { id: 4, latitude: 52.215479812872026, longitude: 21.053844123630757 },
        { id: 4, latitude: 52.213325183247946, longitude: 21.054945169905064 },
        { id: 4, latitude: 52.2126677642138, longitude: 21.049637949487018 },
        { id: 4, latitude: 52.20991695869858, longitude: 21.044385717087984 },
        { id: 4, latitude: 52.20985086211366, longitude: 21.03590552258716 },
        { id: 4, latitude: 52.20707370610879, longitude: 21.03474913557836 },
        { id: 4, latitude: 52.207307751757796, longitude: 21.029229225844862 },
        { id: 4, latitude: 52.21367630522989, longitude: 21.02157933528188 },
      ],
    },
    {
      id: 5,
      name: "Mokotów",
      pinLatitude: 52.192437137699535,
      pinLongitude: 21.04222197232121,
      border_coords: [
        {
          id: 5,
          latitude: 52.19283672577799,
          longitude: 20.98239408843717,
        },
        {
          id: 5,
          latitude: 52.20995343594764,
          longitude: 20.988360674992514,
        },
        {
          id: 5,
          latitude: 52.209144961179476,
          longitude: 20.9984573580671,
        },
        {
          id: 5,
          latitude: 52.21050825416022,
          longitude: 21.006186243855478,
        },

        { id: 5, latitude: 52.21367630522989, longitude: 21.02157933528188 },

        { id: 5, latitude: 52.207307751757796, longitude: 21.029229225844862 },

        { id: 5, latitude: 52.20707370610879, longitude: 21.03474913557836 },
        { id: 5, latitude: 52.20985086211366, longitude: 21.03590552258716 },

        { id: 5, latitude: 52.20991695869858, longitude: 21.044385717087984 },
        { id: 5, latitude: 52.2126677642138, longitude: 21.049637949487018 },
        { id: 5, latitude: 52.213325183247946, longitude: 21.054945169905064 },
        { id: 5, latitude: 52.215479812872026, longitude: 21.053844123630757 },
        { id: 5, latitude: 52.21674068527636, longitude: 21.061568555848996 },

        { id: 5, latitude: 52.21942192181367, longitude: 21.063887143123615 },
        {
          id: 5,
          latitude: 52.21849596797299,
          longitude: 21.0804489722271,
        },
        {
          id: 5,
          latitude: 52.21498695144786,
          longitude: 21.093176199598428,
        },
        { id: 5, latitude: 52.21102077544874, longitude: 21.09968606447564 },
        {
          id: 5,
          latitude: 52.20511982548866,
          longitude: 21.102399727797767,
        },
        {
          id: 5,
          latitude: 52.19388044383675,
          longitude: 21.105709996703023,
        },
        {
          id: 5,
          latitude: 52.19081099968086,
          longitude: 21.098858359602325,
        },
        {
          id: 5,
          latitude: 52.18664444110078,
          longitude: 21.09797266605819,
        },
        {
          id: 5,
          latitude: 52.18099851664327,
          longitude: 21.094493996709303,
        },
        {
          id: 5,
          latitude: 52.18458718589301,
          longitude: 21.08132511932805,
        },
        {
          id: 5,
          latitude: 52.17536058413777,
          longitude: 21.063065154545402,
        },
        {
          id: 5,
          latitude: 52.169941158277,
          longitude: 21.069363691430198,
        },
        {
          id: 5,
          latitude: 52.16960739159022,
          longitude: 21.06733723286997,
        },
        {
          id: 5,
          latitude: 52.16942074922098,
          longitude: 21.05397014915004,
        },
        {
          id: 5,
          latitude: 52.175079164395136,
          longitude: 21.04358504104071,
        },
        {
          id: 5,
          latitude: 52.16783648532689,
          longitude: 21.034371175267648,
        },
        {
          id: 5,
          latitude: 52.16674176098905,
          longitude: 21.01809213341353,
        },
        {
          id: 5,
          latitude: 52.16689772288249,
          longitude: 21.00818830637806,
        },
        {
          id: 5,
          latitude: 52.171635611326955,
          longitude: 20.98704305546879,
        },
        {
          id: 5,
          latitude: 52.19044447661777,
          longitude: 20.986251263407702,
        },
      ],
    },
    {
      id: 6,
      name: "Włochy",
      pinLatitude: 52.17913523146612,
      pinLongitude: 20.95152817068608,
      border_coords: [
        { id: 6, latitude: 52.21192409251074, longitude: 20.933727881320287 },
        { id: 6, latitude: 52.21004956408065, longitude: 20.923010392531786 },
        { id: 6, latitude: 52.21443961650765, longitude: 20.914379637319858 },

        { id: 6, latitude: 52.20930021291767, longitude: 20.88085695466502 },
        { id: 6, latitude: 52.202067650350926, longitude: 20.898451661785643 },
        {
          id: 6,
          latitude: 52.20184393311536,
          longitude: 20.90103041890243,
        },
        {
          id: 6,
          latitude: 52.19983136183752,
          longitude: 20.899983419045533,
        },
        {
          id: 6,
          latitude: 52.1957395112879,
          longitude: 20.91099043290665,
        },
        {
          id: 6,
          latitude: 52.192752977267865,
          longitude: 20.91542839901936,
        },
        {
          id: 6,
          latitude: 52.19354932071412,
          longitude: 20.918821740937418,
        },

        { id: 6, latitude: 52.18584572630695, longitude: 20.91466384156343 },

        {
          id: 6,
          latitude: 52.1795446339477,
          longitude: 20.911278875090176,
        },
        {
          id: 6,
          latitude: 52.178460208048314,
          longitude: 20.917017211660283,
        },
        {
          id: 6,
          latitude: 52.17686678115438,
          longitude: 20.9191100173669,
        },
        {
          id: 6,
          latitude: 52.17117919795298,
          longitude: 20.919182103966463,
        },
        {
          id: 6,
          latitude: 52.16929773829916,
          longitude: 20.923404425183083,
        },
        {
          id: 6,
          latitude: 52.16827962474016,
          longitude: 20.924884377487952,
        },
        {
          id: 6,
          latitude: 52.167195022311596,
          longitude: 20.925064614610132,
        },
        {
          id: 6,
          latitude: 52.166243284510735,
          longitude: 20.92401804514255,
        },
        {
          id: 6,
          latitude: 52.164029444937086,
          longitude: 20.930658084353997,
        },
        {
          id: 6,
          latitude: 52.1561704647419,
          longitude: 20.953826044442465,
        },
        {
          id: 6,
          latitude: 52.15296053613811,
          longitude: 20.95382639291187,
        },
        {
          id: 6,
          latitude: 52.14540957536498,
          longitude: 20.96988515299724,
        },
        {
          id: 6,
          latitude: 52.14394755947741,
          longitude: 20.976921940322274,
        },
        {
          id: 6,
          latitude: 52.14051486926665,
          longitude: 20.983417795669638,
        },
        {
          id: 6,
          latitude: 52.14223283309253,
          longitude: 20.984534491638566,
        },
        {
          id: 6,
          latitude: 52.14195200390306,
          longitude: 20.989437825074017,
        },
        {
          id: 6,
          latitude: 52.171635611326955,
          longitude: 20.98704305546879,
        },
        {
          id: 6,
          latitude: 52.19044447661777,
          longitude: 20.986251263407702,
        },
        {
          id: 6,
          latitude: 52.19283672577799,
          longitude: 20.98239408843717,
        },
        {
          id: 6,
          latitude: 52.2017731558781,
          longitude: 20.944665806983174,
        },
      ],
    },
    {
      id: 7,
      name: "Ursus",
      pinLatitude: 52.19494167863636,
      pinLongitude: 20.883072600501173,
      border_coords: [
        { id: 7, latitude: 52.20930021291767, longitude: 20.88085695466502 },
        { id: 7, latitude: 52.202067650350926, longitude: 20.898451661785643 },
        {
          id: 7,
          latitude: 52.20184393311536,
          longitude: 20.90103041890243,
        },
        {
          id: 7,
          latitude: 52.19983136183752,
          longitude: 20.899983419045533,
        },
        {
          id: 7,
          latitude: 52.1957395112879,
          longitude: 20.91099043290665,
        },
        {
          id: 7,
          latitude: 52.192752977267865,
          longitude: 20.91542839901936,
        },
        {
          id: 7,
          latitude: 52.19354932071412,
          longitude: 20.918821740937418,
        },
        { id: 7, latitude: 52.18584572630695, longitude: 20.91466384156343 },
        {
          id: 7,
          latitude: 52.1857780231757,
          longitude: 20.909283622111126,
        },
        {
          id: 7,
          latitude: 52.18451078430977,
          longitude: 20.90921979012693,
        },
        {
          id: 7,
          latitude: 52.18415033597749,
          longitude: 20.90404275841107,
        },
        {
          id: 7,
          latitude: 52.18389218835313,
          longitude: 20.90397895069169,
        },
        {
          id: 7,
          latitude: 52.18436157499932,
          longitude: 20.90188653691026,
        },
        {
          id: 7,
          latitude: 52.184025174618355,
          longitude: 20.899130623186252,
        },
        {
          id: 7,
          latitude: 52.18250882520274,
          longitude: 20.897668007739004,
        },
        {
          id: 7,
          latitude: 52.1825246259036,
          longitude: 20.893935114740575,
        },
        {
          id: 7,
          latitude: 52.182310664244234,
          longitude: 20.89332059861246,
        },
        {
          id: 7,
          latitude: 52.18249673168571,
          longitude: 20.893191637975956,
        },
        {
          id: 7,
          latitude: 52.182411383319945,
          longitude: 20.8783832663513,
        },
        {
          id: 7,
          latitude: 52.18242935990051,
          longitude: 20.86722379562439,
        },
        {
          id: 7,
          latitude: 52.1907825358657,
          longitude: 20.86713076837994,
        },
        {
          id: 7,
          latitude: 52.187148891184954,
          longitude: 20.854659339596136,
        },
        {
          id: 7,
          latitude: 52.190146674596924,
          longitude: 20.856499894085566,
        },
        {
          id: 7,
          latitude: 52.19279042947526,
          longitude: 20.855218863374688,
        },
        {
          id: 7,
          latitude: 52.20058295322582,
          longitude: 20.85120227957381,
        },
        {
          id: 7,
          latitude: 52.20481567381727,
          longitude: 20.85307557578758,
        },
        {
          id: 7,
          latitude: 52.206675933383735,
          longitude: 20.856065679725578,
        },
        {
          id: 7,
          latitude: 52.20828217696179,
          longitude: 20.862239182415625,
        },
        {
          id: 7,
          latitude: 52.20926520437598,
          longitude: 20.870736442233774,
        },
        {
          id: 7,
          latitude: 52.20895477184586,
          longitude: 20.870994506701177,
        },
      ],
    },
    {
      name: "Bielany",
      id: 8,
      pinLatitude: 52.29283591075975,
      pinLongitude: 20.928457813423798,
      border_coords: [
        { id: 8, latitude: 52.26278149374645, longitude: 20.951860701821204 },

        { id: 8, latitude: 52.26699278746872, longitude: 20.940013962103436 },
        { id: 8, latitude: 52.27741362963241, longitude: 20.89277661018494 },
        { id: 8, latitude: 52.28067302911132, longitude: 20.88882528618516 },
        { id: 8, latitude: 52.280147430830574, longitude: 20.887278722728198 },
        { id: 8, latitude: 52.28014749733764, longitude: 20.88521675293352 },
        { id: 8, latitude: 52.279411590175116, longitude: 20.880577349752528 },
        { id: 8, latitude: 52.280547068447916, longitude: 20.87584256001144 },
        {
          id: 8,
          latitude: 52.294087162267544,
          longitude: 20.877052158314402,
        },
        {
          id: 8,
          latitude: 52.29869374400763,
          longitude: 20.87575075977092,
        },
        {
          id: 8,
          latitude: 52.30965337146283,
          longitude: 20.880092553325298,
        },
        {
          id: 8,
          latitude: 52.314150217058064,
          longitude: 20.87537503319029,
        },
        {
          id: 8,
          latitude: 52.315035945879224,
          longitude: 20.875597938835547,
        },
        {
          id: 8,
          latitude: 52.31380874486346,
          longitude: 20.889417631600313,
        },
        {
          id: 8,
          latitude: 52.32144304320286,
          longitude: 20.89520613060694,
        },
        {
          id: 8,
          latitude: 52.323349530625585,
          longitude: 20.90649918038382,
        },
        {
          id: 8,
          latitude: 52.32203259713566,
          longitude: 20.90690739285936,
        },
        {
          id: 8,
          latitude: 52.323962624711136,
          longitude: 20.910510675890187,
        },
        {
          id: 8,
          latitude: 52.32182876512863,
          longitude: 20.91296176089596,
        },
        {
          id: 8,
          latitude: 52.32367438697633,
          longitude: 20.921947378819556,
        },
        {
          id: 8,
          latitude: 52.32662571368061,
          longitude: 20.922690338024726,
        },
        {
          id: 8,
          latitude: 52.33141574098615,
          longitude: 20.92752031971896,
        },
        {
          id: 8,
          latitude: 52.31738496518767,
          longitude: 20.93394422153255,
        },
        {
          id: 8,
          latitude: 52.306439432608876,
          longitude: 20.95069725340917,
        },
        {
          id: 8,
          latitude: 52.2963051021471,
          longitude: 20.972615180509855,
        },
        {
          id: 8,
          latitude: 52.28755828079969,
          longitude: 20.99479477212251,
        },
        {
          id: 8,
          latitude: 52.28505226032884,
          longitude: 20.98917363458256,
        },
        {
          id: 8,
          latitude: 52.286241250520966,
          longitude: 20.986179560290793,
        },
        {
          id: 8,
          latitude: 52.28566214027321,
          longitude: 20.985759881427803,
        },
        {
          id: 8,
          latitude: 52.283412700946414,
          longitude: 20.985338954177266,
        },
        {
          id: 8,
          latitude: 52.27420099001485,
          longitude: 20.966915832466096,
        },
        {
          id: 8,
          latitude: 52.274972441463795,
          longitude: 20.96510398698406,
        },
        {
          id: 8,
          latitude: 52.270922371132094,
          longitude: 20.962555836322608,
        },
      ],
    },
    {
      id: 9,
      name: "Żoliborz",
      pinLatitude: 52.26961150383336,
      pinLongitude: 20.98111984862032,
      border_coords: [
        { id: 9, latitude: 52.255214846616525, longitude: 20.94703945059227 },
        { id: 9, latitude: 52.25700229235294, longitude: 20.946526893730216 },
        { id: 9, latitude: 52.26278149374645, longitude: 20.951860701821204 },
        {
          id: 9,
          latitude: 52.270922371132094,
          longitude: 20.962555836322608,
        },
        {
          id: 9,
          latitude: 52.274972441463795,
          longitude: 20.96510398698406,
        },
        {
          id: 9,
          latitude: 52.27420099001485,
          longitude: 20.966915832466096,
        },
        {
          id: 9,
          latitude: 52.283412700946414,
          longitude: 20.985338954177266,
        },
        {
          id: 9,
          latitude: 52.28566214027321,
          longitude: 20.985759881427803,
        },

        {
          id: 9,
          latitude: 52.286241250520966,
          longitude: 20.986179560290793,
        },

        {
          id: 9,
          latitude: 52.28505226032884,
          longitude: 20.98917363458256,
        },

        {
          id: 9,
          latitude: 52.28755828079969,
          longitude: 20.99479477212251,
        },

        {
          id: 9,
          latitude: 52.27579626202624,
          longitude: 21.004513381625124,
        },
        { id: 9, latitude: 52.26154842706568, longitude: 21.010268668934167 },

        { id: 9, latitude: 52.25921750000523, longitude: 21.00218364388682 },
        { id: 9, latitude: 52.25928908499541, longitude: 20.980061552895798 },

        { id: 9, latitude: 52.25438717708059, longitude: 20.965361311172128 },
        { id: 9, latitude: 52.25572639024137, longitude: 20.960990323147577 },
        { id: 9, latitude: 52.254681140655926, longitude: 20.951409552430977 },
      ],
    },
    {
      id: 10,
      name: "Praga-Południe",
      pinLatitude: 52.24170681611095,
      pinLongitude: 21.084235593976047,
      border_coords: [
        {
          id: 10,
          latitude: 52.21498695144786,
          longitude: 21.093176199598428,
        },
        {
          id: 10,
          latitude: 52.23237770478838,
          longitude: 21.119058448494325,
        },
        {
          id: 10,
          latitude: 52.232485204978886,
          longitude: 21.125160776481337,
        },
        {
          id: 10,
          latitude: 52.23895155595239,
          longitude: 21.132832732754636,
        },
        {
          id: 10,
          latitude: 52.240352950606805,
          longitude: 21.129851086158045,
        },
        {
          id: 10,
          latitude: 52.24342730241515,
          longitude: 21.131915184667275,
        },
        {
          id: 10,
          latitude: 52.256669224083694,
          longitude: 21.11496293681934,
        },
        {
          id: 10,
          latitude: 52.25931403562349,
          longitude: 21.115094437212374,
        },
        {
          id: 10,
          latitude: 52.25950060374452,
          longitude: 21.110840481075616,
        },

        {
          id: 10,
          latitude: 52.260398890010016,
          longitude: 21.088580618316545,
        },
        {
          id: 10,
          latitude: 52.25849331767333,
          longitude: 21.071660225552563,
        },
        {
          id: 10,
          latitude: 52.25003591619267,
          longitude: 21.046659430380632,
        },
        {
          id: 10,
          latitude: 52.24807532482629,
          longitude: 21.043743886262593,
        },
        {
          id: 10,
          latitude: 52.2433423931987,
          longitude: 21.04327987673144,
        },
        {
          id: 10,
          latitude: 52.24022002474121,
          longitude: 21.039682898914318,
        },
        {
          id: 10,
          latitude: 52.24022002474121,
          longitude: 21.039682898914318,
        },
        { id: 10, latitude: 52.238926248308886, longitude: 21.037536890866868 },
        { id: 10, latitude: 52.22573140996712, longitude: 21.049720595530275 },
        { id: 10, latitude: 52.22057954597261, longitude: 21.058995357561205 },
        { id: 10, latitude: 52.21942192181367, longitude: 21.063887143123615 },
        {
          id: 10,
          latitude: 52.21849596797299,
          longitude: 21.0804489722271,
        },
      ],
    },
    {
      id: 11,
      name: "Praga-Północ",
      pinLatitude: 52.26311763395971,
      pinLongitude: 21.02828401823001,
      border_coords: [
        {
          id: 11,
          latitude: 52.294753712634495,
          longitude: 21.01295310213684,
        },
        {
          id: 11,
          latitude: 52.2892896528296,
          longitude: 21.016984459067334,
        },
        {
          id: 11,
          latitude: 52.2866979728953,
          longitude: 21.01999509018185,
        },
        {
          id: 11,
          latitude: 52.284512393105324,
          longitude: 21.020810957078055,
        },
        {
          id: 11,
          latitude: 52.280797081062545,
          longitude: 21.020809677123342,
        },
        {
          id: 11,
          latitude: 52.27264740476955,
          longitude: 21.025809137145444,
        },
        {
          id: 11,
          latitude: 52.27096049814047,
          longitude: 21.031730524791804,
        },
        {
          id: 11,
          latitude: 52.26839992366713,
          longitude: 21.03734502739731,
        },
        {
          id: 11,
          latitude: 52.26133470879788,
          longitude: 21.063103095156656,
        },
        {
          id: 11,
          latitude: 52.25892680620487,
          longitude: 21.06768580472973,
        },
        {
          id: 11,
          latitude: 52.25849331767333,
          longitude: 21.071660225552563,
        },
        {
          id: 11,
          latitude: 52.25003591619267,
          longitude: 21.046659430380632,
        },
        {
          id: 11,
          latitude: 52.24807532482629,
          longitude: 21.043743886262593,
        },
        {
          id: 11,
          latitude: 52.2433423931987,
          longitude: 21.04327987673144,
        },
        {
          id: 11,
          latitude: 52.24022002474121,
          longitude: 21.039682898914318,
        },
        {
          id: 11,
          latitude: 52.24022002474121,
          longitude: 21.039682898914318,
        },
        { id: 11, latitude: 52.238926248308886, longitude: 21.037536890866868 },
        { id: 11, latitude: 52.238926248308886, longitude: 21.037536890866868 },

        { id: 11, latitude: 52.24870750496108, longitude: 21.022237649466668 },

        { id: 11, latitude: 52.26154842706568, longitude: 21.010268668934167 },
        {
          id: 11,
          latitude: 52.27579626202624,
          longitude: 21.004513381625124,
        },
        {
          id: 11,
          latitude: 52.28755828079969,
          longitude: 20.99479477212251,
        },
        {
          id: 11,
          latitude: 52.28949598853385,
          longitude: 20.998749913583424,
        },
        {
          id: 11,
          latitude: 52.29243830947124,
          longitude: 20.999250151365825,
        },
        {
          id: 11,
          latitude: 52.292533719134425,
          longitude: 21.001186937627196,
        },
        {
          id: 11,
          latitude: 52.29186479542524,
          longitude: 21.00371707143112,
        },
      ],
    },
    {
      id: 12,
      name: "Targówek",
      pinLatitude: 52.28184206565032,
      pinLongitude: 21.062763638087155,
      border_coords: [
        {
          id: 12,
          latitude: 52.294753712634495,
          longitude: 21.01295310213684,
        },
        {
          id: 12,
          latitude: 52.29692528708072,
          longitude: 21.01369784433107,
        },
        {
          id: 12,
          latitude: 52.29703772731229,
          longitude: 21.01472228554568,
        },
        {
          id: 12,
          latitude: 52.29538302983513,
          longitude: 21.016954880085393,
        },
        {
          id: 12,
          latitude: 52.30628417890875,
          longitude: 21.056991746878758,
        },
        {
          id: 12,
          latitude: 52.307796607280984,
          longitude: 21.0694407190731,
        },
        {
          id: 12,
          latitude: 52.307799646722614,
          longitude: 21.08338616171194,
        },
        {
          id: 12,
          latitude: 52.30338324340814,
          longitude: 21.085407942309903,
        },
        {
          id: 12,
          latitude: 52.30301397059204,
          longitude: 21.083674540575082,
        },
        {
          id: 12,
          latitude: 52.295666300027676,
          longitude: 21.0877192188434,
        },
        {
          id: 12,
          latitude: 52.28883981714742,
          longitude: 21.094565076613527,
        },
        {
          id: 12,
          latitude: 52.28618403828073,
          longitude: 21.095898838655003,
        },
        {
          id: 12,
          latitude: 52.28606939100999,
          longitude: 21.099432153427784,
        },
        {
          id: 12,
          latitude: 52.284185249043134,
          longitude: 21.10053481527798,
        },

        {
          id: 12,
          latitude: 52.2740308975493,
          longitude: 21.104913819781277,
        },
        {
          id: 12,
          latitude: 52.27446322134002,
          longitude: 21.108204734950608,
        },
        {
          id: 12,
          latitude: 52.27071964166549,
          longitude: 21.10959585424388,
        },
        {
          id: 12,
          latitude: 52.27038181968082,
          longitude: 21.10875656139505,
        },
        {
          id: 12,
          latitude: 52.268205806554725,
          longitude: 21.108822740514462,
        },

        {
          id: 12,
          latitude: 52.25950060374452,
          longitude: 21.110840481075616,
        },
        {
          id: 12,
          latitude: 52.260398890010016,
          longitude: 21.088580618316545,
        },
        {
          id: 12,
          latitude: 52.25849331767333,
          longitude: 21.071660225552563,
        },

        {
          id: 12,
          latitude: 52.25892680620487,
          longitude: 21.06768580472973,
        },

        {
          id: 12,
          latitude: 52.26133470879788,
          longitude: 21.063103095156656,
        },

        {
          id: 12,
          latitude: 52.26839992366713,
          longitude: 21.03734502739731,
        },

        {
          id: 12,
          latitude: 52.27096049814047,
          longitude: 21.031730524791804,
        },

        {
          id: 12,
          latitude: 52.27264740476955,
          longitude: 21.025809137145444,
        },

        {
          id: 12,
          latitude: 52.280797081062545,
          longitude: 21.020809677123342,
        },

        {
          id: 12,
          latitude: 52.284512393105324,
          longitude: 21.020810957078055,
        },

        {
          id: 12,
          latitude: 52.2866979728953,
          longitude: 21.01999509018185,
        },

        {
          id: 12,
          latitude: 52.2892896528296,
          longitude: 21.016984459067334,
        },
      ],
    },
    {
      id: 13,
      name: "Rembertów",
      pinLatitude: 52.26324218102785,
      pinLongitude: 21.147185530419947,
      border_coords: [
        {
          id: 13,
          latitude: 52.25950060374452,
          longitude: 21.110840481075616,
        },

        {
          id: 13,
          latitude: 52.268205806554725,
          longitude: 21.108822740514462,
        },

        {
          id: 13,
          latitude: 52.27038181968082,
          longitude: 21.10875656139505,
        },

        {
          id: 13,
          latitude: 52.27071964166549,
          longitude: 21.10959585424388,
        },

        {
          id: 13,
          latitude: 52.27446322134002,
          longitude: 21.108204734950608,
        },

        {
          id: 13,
          latitude: 52.27601378133046,
          longitude: 21.122142781711776,
        },
        {
          id: 13,
          latitude: 52.278338259743244,
          longitude: 21.141499676903617,
        },
        {
          id: 13,
          latitude: 52.27932003353707,
          longitude: 21.148945089711418,
        },
        {
          id: 13,
          latitude: 52.28377384032705,
          longitude: 21.15538596649989,
        },
        {
          id: 13,
          latitude: 52.28565924194913,
          longitude: 21.16155649135895,
        },
        {
          id: 13,
          latitude: 52.289610082860285,
          longitude: 21.164131775582998,
        },
        {
          id: 13,
          latitude: 52.29060763585677,
          longitude: 21.16636337649132,
        },
        {
          id: 13,
          latitude: 52.290922542444626,
          longitude: 21.168466414852517,
        },
        {
          id: 13,
          latitude: 52.29084371725588,
          longitude: 21.169560845616697,
        },
        {
          id: 13,
          latitude: 52.288507402875986,
          longitude: 21.172779001263738,
        },
        {
          id: 13,
          latitude: 52.2857641026506,
          longitude: 21.17290728898163,
        },
        {
          id: 13,
          latitude: 52.28575101782088,
          longitude: 21.17224211368442,
        },
        {
          id: 13,
          latitude: 52.27763920648265,
          longitude: 21.171079476650327,
        },
        {
          id: 13,
          latitude: 52.27730686196949,
          longitude: 21.170568081180374,
        },
        {
          id: 13,
          latitude: 52.272322773408376,
          longitude: 21.176399663408656,
        },
        {
          id: 13,
          latitude: 52.26824297264715,
          longitude: 21.183818850307055,
        },
        {
          id: 13,
          latitude: 52.26636731456019,
          longitude: 21.18533623687245,
        },
        {
          id: 13,
          latitude: 52.26493731480736,
          longitude: 21.18535145298607,
        },
        {
          id: 13,
          latitude: 52.259906514077976,
          longitude: 21.184719460623384,
        },
        {
          id: 13,
          latitude: 52.258692957852034,
          longitude: 21.184037103658564,
        },
        {
          id: 13,
          latitude: 52.25657256915647,
          longitude: 21.180166891782314,
        },
        {
          id: 13,
          latitude: 52.25610038291619,
          longitude: 21.190318047948523,
        },
        {
          id: 13,
          latitude: 52.24999491872905,
          longitude: 21.191109731144397,
        },
        {
          id: 13,
          latitude: 52.249799867103164,
          longitude: 21.1903662753923,
        },
        {
          id: 13,
          latitude: 52.249827734252115,
          longitude: 21.190320759380388,
        },
        {
          id: 13,
          latitude: 52.25218710310838,
          longitude: 21.18878836031783,
        },
        {
          id: 13,
          latitude: 52.251648272710014,
          longitude: 21.186928268182022,
        },
        {
          id: 13,
          latitude: 52.250355846336845,
          longitude: 21.186711688231885,
        },
        {
          id: 13,
          latitude: 52.24950802357925,
          longitude: 21.18278519165835,
        },
        {
          id: 13,
          latitude: 52.24690543960395,
          longitude: 21.184381872088252,
        },
        {
          id: 13,
          latitude: 52.24675078395129,
          longitude: 21.183984914609468,
        },
        {
          id: 13,
          latitude: 52.24645803097272,
          longitude: 21.18413827306914,
        },
        {
          id: 13,
          latitude: 52.24529814493722,
          longitude: 21.17656214247698,
        },
        {
          id: 13,
          latitude: 52.243594528654185,
          longitude: 21.173236621319216,
        },
        {
          id: 13,
          latitude: 52.24166529708718,
          longitude: 21.163632415251676,
        },
        {
          id: 13,
          latitude: 52.24243318197013,
          longitude: 21.163271576831864,
        },
        {
          id: 13,
          latitude: 52.242261940273934,
          longitude: 21.16220698905891,
        },
        {
          id: 13,
          latitude: 52.2431237302988,
          longitude: 21.16179200048097,
        },
        {
          id: 13,
          latitude: 52.23913846707605,
          longitude: 21.141607453518613,
        },
        {
          id: 13,
          latitude: 52.24373032750993,
          longitude: 21.139076736924828,
        },
        {
          id: 13,
          latitude: 52.23895155595239,
          longitude: 21.132832732754636,
        },
        {
          id: 13,
          latitude: 52.240352950606805,
          longitude: 21.129851086158045,
        },
        {
          id: 13,
          latitude: 52.24342730241515,
          longitude: 21.131915184667275,
        },
        {
          id: 13,
          latitude: 52.256669224083694,
          longitude: 21.11496293681934,
        },
        {
          id: 13,
          latitude: 52.25931403562349,
          longitude: 21.115094437212374,
        },
      ],
    },
    {
      id: 14,
      name: "Ursynów",
      pinLongitude: 21.027330954805286,
      pinLatitude: 52.13737231109017,
      border_coords: [
        {
          id: 14,
          latitude: 52.175079164395136,
          longitude: 21.04358504104071,
        },
        {
          id: 14,
          latitude: 52.16783648532689,
          longitude: 21.034371175267648,
        },
        {
          id: 14,
          latitude: 52.16674176098905,
          longitude: 21.01809213341353,
        },
        {
          id: 14,
          latitude: 52.16689772288249,
          longitude: 21.00818830637806,
        },
        {
          id: 14,
          latitude: 52.171635611326955,
          longitude: 20.98704305546879,
        },
        {
          id: 14,
          latitude: 52.19044447661777,
          longitude: 20.986251263407702,
        },
        {
          id: 14,
          latitude: 52.171635611326955,
          longitude: 20.98704305546879,
        },
        {
          id: 14,
          latitude: 52.14195200390306,
          longitude: 20.989437825074017,
        },
        {
          id: 14,
          latitude: 52.14223283309253,
          longitude: 20.984534491638566,
        },
        {
          id: 14,
          latitude: 52.14051486926665,
          longitude: 20.983417795669638,
        },

        {
          id: 14,
          latitude: 52.13908114959255,
          longitude: 20.98508735059557,
        },

        {
          id: 14,
          latitude: 52.13279213247147,
          longitude: 20.980221999231503,
        },
        {
          id: 14,
          latitude: 52.12823746539035,
          longitude: 20.979936728746004,
        },
        {
          id: 14,
          latitude: 52.12394699987132,
          longitude: 20.983113118264896,
        },
        {
          id: 14,
          latitude: 52.12389474117324,
          longitude: 20.989337221374225,
        },
        {
          id: 14,
          latitude: 52.1203438223549,
          longitude: 20.985066218239545,
        },
        {
          id: 14,
          latitude: 52.11562925368049,
          longitude: 20.98717473854947,
        },
        {
          id: 14,
          latitude: 52.11173380256916,
          longitude: 20.983715160064,
        },
        {
          id: 14,
          latitude: 52.110887072611504,
          longitude: 20.984634213679723,
        },
        {
          id: 14,
          latitude: 52.11055492783236,
          longitude: 20.98676977402704,
        },
        {
          id: 14,
          latitude: 52.1054907159734,
          longitude: 20.98441785189948,
        },
        {
          id: 14,
          latitude: 52.10504223282585,
          longitude: 20.987391394521524,
        },
        {
          id: 14,
          latitude: 52.10391320743139,
          longitude: 20.98679649052453,
        },
        {
          id: 14,
          latitude: 52.10311613893575,
          longitude: 20.991747453670403,
        },
        {
          id: 14,
          latitude: 52.10373006085483,
          longitude: 21.018429875450472,
        },
        {
          id: 14,
          latitude: 52.10602155226028,
          longitude: 21.01851116223914,
        },
        {
          id: 14,
          latitude: 52.10611607422385,
          longitude: 21.033847806301985,
        },
        {
          id: 14,
          latitude: 52.105760734548426,
          longitude: 21.034772445462107,
        },
        {
          id: 14,
          latitude: 52.106461709615864,
          longitude: 21.03564059153683,
        },
        {
          id: 14,
          latitude: 52.1067184405289,
          longitude: 21.03514228303977,
        },
        {
          id: 14,
          latitude: 52.108411407827916,
          longitude: 21.03808313866346,
        },
        {
          id: 14,
          latitude: 52.111275656454744,
          longitude: 21.04194599592274,
        },
        {
          id: 14,
          latitude: 52.11181865747368,
          longitude: 21.041849583478733,
        },
        {
          id: 14,
          latitude: 52.11293420774711,
          longitude: 21.043827089869342,
        },
        {
          id: 14,
          latitude: 52.108498354183986,
          longitude: 21.052022114785238,
        },
        {
          id: 14,
          latitude: 52.10758021699742,
          longitude: 21.05628194904111,
        },
        {
          id: 14,
          latitude: 52.09784637403146,
          longitude: 21.0799297778856,
        },
        {
          id: 14,
          latitude: 52.098764717012585,
          longitude: 21.08269469678239,
        },
        {
          id: 14,
          latitude: 52.103191143584176,
          longitude: 21.087332026242763,
        },
        {
          id: 14,
          latitude: 52.10469359072108,
          longitude: 21.09242191841841,
        },
        {
          id: 14,
          latitude: 52.104587504011555,
          longitude: 21.095515329966627,
        },
        {
          id: 14,
          latitude: 52.10533784447821,
          longitude: 21.100627256894633,
        },
        {
          id: 14,
          latitude: 52.10578208052553,
          longitude: 21.103472620762542,
        },

        {
          id: 14,
          latitude: 52.10773319843597,
          longitude: 21.10164291192465,
        },
        {
          id: 14,
          latitude: 52.10786973013104,
          longitude: 21.10175991794096,
        },
        {
          id: 14,
          latitude: 52.10838825922026,
          longitude: 21.10017092542512,
        },
        {
          id: 14,
          latitude: 52.10933562061719,
          longitude: 21.098343556518394,
        },
        {
          id: 14,
          latitude: 52.11384988525206,
          longitude: 21.09523868561015,
        },
        {
          id: 14,
          latitude: 52.11408589409881,
          longitude: 21.0943892720141,
        },
        {
          id: 14,
          latitude: 52.114690932394005,
          longitude: 21.08826932084148,
        },
        {
          id: 14,
          latitude: 52.114964350163504,
          longitude: 21.088199753306483,
        },
        {
          id: 14,
          latitude: 52.11497289064036,
          longitude: 21.088895453373183,
        },
        {
          id: 14,
          latitude: 52.11459683738512,
          longitude: 21.09434965224784,
        },
        {
          id: 14,
          latitude: 52.11781088905115,
          longitude: 21.0914058413008,
        },
        {
          id: 14,
          latitude: 52.130666766788316,
          longitude: 21.08206769110655,
        },
        {
          id: 14,
          latitude: 52.13705666457796,
          longitude: 21.077703806460008,
        },
        {
          id: 14,
          latitude: 52.13714381702096,
          longitude: 21.0727620538898,
        },
        {
          id: 14,
          latitude: 52.13757889198094,
          longitude: 21.072356992528555,
        },
        {
          id: 14,
          latitude: 52.13964237843788,
          longitude: 21.072012732590835,
        },
        {
          id: 14,
          latitude: 52.14342924763798,
          longitude: 21.06893948565886,
        },
        {
          id: 14,
          latitude: 52.14519415464912,
          longitude: 21.06999289275613,
        },
        {
          id: 14,
          latitude: 52.15088294077359,
          longitude: 21.06371059712805,
        },
        {
          id: 14,
          latitude: 52.15067167914043,
          longitude: 21.062961175381936,
        },
        {
          id: 14,
          latitude: 52.1507360419941,
          longitude: 21.063025636943273,
        },
        {
          id: 14,
          latitude: 52.15171778550734,
          longitude: 21.062964939940482,
        },
        {
          id: 14,
          latitude: 52.16576825874636,
          longitude: 21.04979265358865,
        },
        { id: 14, latitude: 52.168182612325985, longitude: 21.047272445257196 },
        {
          id: 14,
          latitude: 52.16942461293974,
          longitude: 21.053935866159076,
        },
      ],
    },
    {
      id: 15,
      name: "Wilanów",
      pinLatitude: 52.1564625136324,
      pinLongitude: 21.110806106326184,
      border_coords: [
        {
          id: 15,
          latitude: 52.10838825922026,
          longitude: 21.10017092542512,
        },

        {
          id: 15,
          latitude: 52.10933562061719,
          longitude: 21.098343556518394,
        },
        {
          id: 15,
          latitude: 52.11384988525206,
          longitude: 21.09523868561015,
        },
        {
          id: 15,
          latitude: 52.11408589409881,
          longitude: 21.0943892720141,
        },
        {
          id: 15,
          latitude: 52.114690932394005,
          longitude: 21.08826932084148,
        },
        {
          id: 15,
          latitude: 52.114964350163504,
          longitude: 21.088199753306483,
        },
        {
          id: 15,
          latitude: 52.11497289064036,
          longitude: 21.088895453373183,
        },
        {
          id: 15,
          latitude: 52.11459683738512,
          longitude: 21.09434965224784,
        },
        {
          id: 15,
          latitude: 52.11781088905115,
          longitude: 21.0914058413008,
        },
        {
          id: 15,
          latitude: 52.130666766788316,
          longitude: 21.08206769110655,
        },
        {
          id: 15,
          latitude: 52.13705666457796,
          longitude: 21.077703806460008,
        },
        {
          id: 15,
          latitude: 52.13714381702096,
          longitude: 21.0727620538898,
        },
        {
          id: 15,
          latitude: 52.13757889198094,
          longitude: 21.072356992528555,
        },
        {
          id: 15,
          latitude: 52.13964237843788,
          longitude: 21.072012732590835,
        },
        {
          id: 15,
          latitude: 52.14342924763798,
          longitude: 21.06893948565886,
        },
        {
          id: 15,
          latitude: 52.14519415464912,
          longitude: 21.06999289275613,
        },
        {
          id: 15,
          latitude: 52.15088294077359,
          longitude: 21.06371059712805,
        },
        {
          id: 15,
          latitude: 52.15067167914043,
          longitude: 21.062961175381936,
        },
        {
          id: 15,
          latitude: 52.1507360419941,
          longitude: 21.063025636943273,
        },
        {
          id: 15,
          latitude: 52.15171778550734,
          longitude: 21.062964939940482,
        },
        {
          id: 15,
          latitude: 52.16576825874636,
          longitude: 21.04979265358865,
        },
        { id: 15, latitude: 52.168182612325985, longitude: 21.047272445257196 },
        {
          id: 15,
          latitude: 52.16942461293974,
          longitude: 21.053935866159076,
        },
        {
          id: 15,
          latitude: 52.16960739159022,
          longitude: 21.06733723286997,
        },
        {
          id: 15,
          latitude: 52.169941158277,
          longitude: 21.069363691430198,
        },
        {
          id: 15,
          latitude: 52.17536058413777,
          longitude: 21.063065154545402,
        },
        {
          id: 15,
          latitude: 52.18458718589301,
          longitude: 21.08132511932805,
        },
        {
          id: 15,
          latitude: 52.18099851664327,
          longitude: 21.094493996709303,
        },
        {
          id: 15,
          latitude: 52.18664444110078,
          longitude: 21.09797266605819,
        },
        {
          id: 15,
          latitude: 52.19081099968086,
          longitude: 21.098858359602325,
        },
        {
          id: 15,
          latitude: 52.19388044383675,
          longitude: 21.105709996703023,
        },
        {
          id: 15,
          latitude: 52.187677218425264,
          longitude: 21.10896682644781,
        },
        {
          id: 15,
          latitude: 52.180389656715825,
          longitude: 21.11946819965362,
        },
        {
          id: 15,
          latitude: 52.17330827393472,
          longitude: 21.132308991482272,
        },
        {
          id: 15,
          latitude: 52.16133486852183,
          longitude: 21.14240152470782,
        },
        {
          id: 15,
          latitude: 52.14471868819128,
          longitude: 21.165311850281565,
        },
        {
          id: 15,
          latitude: 52.14350773867093,
          longitude: 21.154892273532436,
        },
        {
          id: 15,
          latitude: 52.14252158628496,
          longitude: 21.153147932291244,
        },
        {
          id: 15,
          latitude: 52.14047467869162,
          longitude: 21.15397507618095,
        },
        {
          id: 15,
          latitude: 52.13981741699227,
          longitude: 21.15043674452536,
        },
        {
          id: 15,
          latitude: 52.13292318890616,
          longitude: 21.14027634306035,
        },
        {
          id: 15,
          latitude: 52.13095049579155,
          longitude: 21.138847726970457,
        },
        {
          id: 15,
          latitude: 52.123517223233186,
          longitude: 21.134822173494324,
        },
        {
          id: 15,
          latitude: 52.12329805232255,
          longitude: 21.13235525874795,
        },
        {
          id: 15,
          latitude: 52.12698480697135,
          longitude: 21.129238777631926,
        },
        {
          id: 15,
          latitude: 52.125450217253835,
          longitude: 21.126447059760007,
        },
        {
          id: 15,
          latitude: 52.11993568068052,
          longitude: 21.122055674953717,
        },
        {
          id: 15,
          latitude: 52.11883966498442,
          longitude: 21.116277384963393,
        },
        {
          id: 15,
          latitude: 52.114813145521445,
          longitude: 21.10903823077372,
        },
        {
          id: 15,
          latitude: 52.113317765680875,
          longitude: 21.110369091913046,
        },
        {
          id: 15,
          latitude: 52.10844599372964,
          longitude: 21.100150816222463,
        },
      ],
    },
    {
      id: 16,
      name: "Białołęka",
      pinLatitude: 52.32883674939747,
      pinLongitude: 20.99891929455988,
      border_coords: [
        {
          id: 16,
          latitude: 52.353734473442756,
          longitude: 20.915001806251706,
        },

        {
          id: 16,
          latitude: 52.33141574098615,
          longitude: 20.92752031971896,
        },

        {
          id: 16,
          latitude: 52.31738496518767,
          longitude: 20.93394422153255,
        },

        {
          id: 16,
          latitude: 52.306439432608876,
          longitude: 20.95069725340917,
        },

        {
          id: 16,
          latitude: 52.2963051021471,
          longitude: 20.972615180509855,
        },

        {
          id: 16,
          latitude: 52.28755828079969,
          longitude: 20.99479477212251,
        },

        {
          id: 16,
          latitude: 52.28755828079969,
          longitude: 20.99479477212251,
        },
        {
          id: 16,
          latitude: 52.28949598853385,
          longitude: 20.998749913583424,
        },
        {
          id: 16,
          latitude: 52.29243830947124,
          longitude: 20.999250151365825,
        },
        {
          id: 16,
          latitude: 52.292533719134425,
          longitude: 21.001186937627196,
        },
        {
          id: 16,
          latitude: 52.29186479542524,
          longitude: 21.00371707143112,
        },

        {
          id: 16,
          latitude: 52.294753712634495,
          longitude: 21.01295310213684,
        },
        {
          id: 16,
          latitude: 52.29692528708072,
          longitude: 21.01369784433107,
        },
        {
          id: 16,
          latitude: 52.29703772731229,
          longitude: 21.01472228554568,
        },
        {
          id: 16,
          latitude: 52.29538302983513,
          longitude: 21.016954880085393,
        },
        {
          id: 16,
          latitude: 52.30628417890875,
          longitude: 21.056991746878758,
        },
        {
          id: 16,
          latitude: 52.307796607280984,
          longitude: 21.0694407190731,
        },
        {
          id: 16,
          latitude: 52.307799646722614,
          longitude: 21.08338616171194,
        },

        {
          id: 16,
          latitude: 52.307779909189414,
          longitude: 21.083419466316546,
        },
        {
          id: 16,
          latitude: 52.32199331974963,
          longitude: 21.077840812569974,
        },
        {
          id: 16,
          latitude: 52.323907968136645,
          longitude: 21.08960777554673,
        },
        {
          id: 16,
          latitude: 52.331902660694986,
          longitude: 21.086138572993796,
        },
        {
          id: 16,
          latitude: 52.33222640207381,
          longitude: 21.087814191288036,
        },
        {
          id: 16,
          latitude: 52.33286527173958,
          longitude: 21.08751351522052,
        },
        {
          id: 16,
          latitude: 52.33275153063448,
          longitude: 21.086783107003647,
        },
        {
          id: 16,
          latitude: 52.337445246750754,
          longitude: 21.08531837724276,
        },
        {
          id: 16,
          latitude: 52.33734029422828,
          longitude: 21.082396720354048,
        },
        {
          id: 16,
          latitude: 52.34314400673458,
          longitude: 21.080880392420937,
        },
        {
          id: 16,
          latitude: 52.34350455048114,
          longitude: 21.085895391310707,
        },
        {
          id: 16,
          latitude: 52.35416639611893,
          longitude: 21.081661479631645,
        },
        {
          id: 16,
          latitude: 52.353643340434026,
          longitude: 21.078635912719488,
        },
        {
          id: 16,
          latitude: 52.359311650228356,
          longitude: 21.07623712064517,
        },
        {
          id: 16,
          latitude: 52.3594253277516,
          longitude: 21.07715372487085,
        },
        {
          id: 16,
          latitude: 52.36725202888607,
          longitude: 21.073807662988774,
        },
        {
          id: 16,
          latitude: 52.36562506087886,
          longitude: 21.06393427473085,
        },
        {
          id: 16,
          latitude: 52.36579197403716,
          longitude: 21.061323675904717,
        },
        {
          id: 16,
          latitude: 52.36255712068485,
          longitude: 21.06062273723705,
        },
        {
          id: 16,
          latitude: 52.36307615299785,
          longitude: 21.05403148311616,
        },
        {
          id: 16,
          latitude: 52.36171260334298,
          longitude: 21.049193461538167,
        },
        {
          id: 16,
          latitude: 52.36357287310837,
          longitude: 21.04867076520495,
        },
        {
          id: 16,
          latitude: 52.3639338570413,
          longitude: 21.04464684966596,
        },
        {
          id: 16,
          latitude: 52.36163296267873,
          longitude: 21.03064209360238,
        },
        {
          id: 16,
          latitude: 52.365099371738744,
          longitude: 21.027595085045697,
        },
        {
          id: 16,
          latitude: 52.357417072409305,
          longitude: 21.023369501076672,
        },
        {
          id: 16,
          latitude: 52.35605188937562,
          longitude: 21.013394220466356,
        },
        {
          id: 16,
          latitude: 52.35685715521817,
          longitude: 21.013257870476508,
        },
        {
          id: 16,
          latitude: 52.35693312800227,
          longitude: 21.008803527712576,
        },
        {
          id: 16,
          latitude: 52.36406936929598,
          longitude: 21.00571266443709,
        },
        {
          id: 16,
          latitude: 52.36182220595917,
          longitude: 20.994551741535073,
        },
        {
          id: 16,
          latitude: 52.36275249014748,
          longitude: 20.991869075571625,
        },
        {
          id: 16,
          latitude: 52.35890977706416,
          longitude: 20.978159567181542,
        },
        {
          id: 16,
          latitude: 52.35894358818459,
          longitude: 20.971092243276303,
        },
        {
          id: 16,
          latitude: 52.36798607455309,
          longitude: 20.965863393643986,
        },
        {
          id: 16,
          latitude: 52.367662011210406,
          longitude: 20.95285788001736,
        },
        {
          id: 16,
          latitude: 52.36653764598159,
          longitude: 20.95240303358889,
        },
        {
          id: 16,
          latitude: 52.36675384352281,
          longitude: 20.944924342601873,
        },
        {
          id: 16,
          latitude: 52.366337482216714,
          longitude: 20.94360572868927,
        },
        {
          id: 16,
          latitude: 52.361719622214835,
          longitude: 20.938723054736506,
        },
        {
          id: 16,
          latitude: 52.3628513384062,
          longitude: 20.935718407594827,
        },
        {
          id: 16,
          latitude: 52.36278130886537,
          longitude: 20.935183137618168,
        },
        {
          id: 16,
          latitude: 52.358345370703056,
          longitude: 20.93876715880933,
        },
        {
          id: 16,
          latitude: 52.358267934148905,
          longitude: 20.938555806533994,
        },
        {
          id: 16,
          latitude: 52.35934360318308,
          longitude: 20.935132032969513,
        },
        {
          id: 16,
          latitude: 52.35987710097499,
          longitude: 20.933878035958394,
        },
        {
          id: 16,
          latitude: 52.358310995291475,
          longitude: 20.930580965815516,
        },
        {
          id: 16,
          latitude: 52.35987268588599,
          longitude: 20.92781962691888,
        },
        {
          id: 16,
          latitude: 52.35976082000201,
          longitude: 20.924156248434798,
        },
        {
          id: 16,
          latitude: 52.357041639592204,
          longitude: 20.922930308005384,
        },
      ],
    },
    {
      id: 17,
      name: "Wesoła",
      pinLatitude: 52.23230760205531,
      pinLongitude: 21.220656785936818,
      border_coords: [
        {
          id: 17,
          latitude: 52.24999491872905,
          longitude: 21.191109731144397,
        },
        {
          id: 17,
          latitude: 52.249799867103164,
          longitude: 21.1903662753923,
        },
        {
          id: 17,
          latitude: 52.249827734252115,
          longitude: 21.190320759380388,
        },
        {
          id: 17,
          latitude: 52.25218710310838,
          longitude: 21.18878836031783,
        },
        {
          id: 17,
          latitude: 52.251648272710014,
          longitude: 21.186928268182022,
        },
        {
          id: 17,
          latitude: 52.250355846336845,
          longitude: 21.186711688231885,
        },
        {
          id: 17,
          latitude: 52.24950802357925,
          longitude: 21.18278519165835,
        },
        {
          id: 17,
          latitude: 52.24690543960395,
          longitude: 21.184381872088252,
        },
        {
          id: 17,
          latitude: 52.24675078395129,
          longitude: 21.183984914609468,
        },
        {
          id: 17,
          latitude: 52.24645803097272,
          longitude: 21.18413827306914,
        },
        {
          id: 17,
          latitude: 52.23423316839582,
          longitude: 21.197250525202172,
        },
        {
          id: 17,
          latitude: 52.22977376169123,
          longitude: 21.211528167761134,
        },
        {
          id: 17,
          latitude: 52.22820587611794,
          longitude: 21.207184318727357,
        },
        {
          id: 17,
          latitude: 52.220157713012235,
          longitude: 21.20628932305202,
        },
        {
          id: 17,
          latitude: 52.21299425980994,
          longitude: 21.214857013779344,
        },
        {
          id: 17,
          latitude: 52.20883379036732,
          longitude: 21.214631524364556,
        },
        {
          id: 17,
          latitude: 52.197511294278954,
          longitude: 21.21584798638195,
        },
        {
          id: 17,
          latitude: 52.19635334394813,
          longitude: 21.238715123224708,
        },
        {
          id: 17,
          latitude: 52.20277205690747,
          longitude: 21.248982424960126,
        },
        {
          id: 17,
          latitude: 52.206220454952074,
          longitude: 21.248500219092676,
        },
        {
          id: 17,
          latitude: 52.20999433458181,
          longitude: 21.261679503256868,
        },
        {
          id: 17,
          latitude: 52.22248628394613,
          longitude: 21.250144818848753,
        },
        {
          id: 17,
          latitude: 52.222743924496356,
          longitude: 21.250315324194244,
        },
        {
          id: 17,
          latitude: 52.222841411492865,
          longitude: 21.249644677902104,
        },
        {
          id: 17,
          latitude: 52.231704656832655,
          longitude: 21.25024526242097,
        },
        {
          id: 17,
          latitude: 52.23509428416499,
          longitude: 21.254291511130674,
        },
        {
          id: 17,
          latitude: 52.23875959658941,
          longitude: 21.254706584408467,
        },
        {
          id: 17,
          latitude: 52.23828420973531,
          longitude: 21.25198821508501,
        },
        {
          id: 17,
          latitude: 52.23673833834268,
          longitude: 21.24901891494522,
        },
        {
          id: 17,
          latitude: 52.23612211075374,
          longitude: 21.240518944775545,
        },
        {
          id: 17,
          latitude: 52.23676949690076,
          longitude: 21.24006429848633,
        },
        {
          id: 17,
          latitude: 52.237096675606026,
          longitude: 21.23907538484412,
        },
        {
          id: 17,
          latitude: 52.23969366362861,
          longitude: 21.23796523918216,
        },
        {
          id: 17,
          latitude: 52.241593849577065,
          longitude: 21.23912476911872,
        },
        {
          id: 17,
          latitude: 52.24334243679824,
          longitude: 21.23818822975386,
        },
        {
          id: 17,
          latitude: 52.24328828798921,
          longitude: 21.23895985882427,
        },
        {
          id: 17,
          latitude: 52.2450477372195,
          longitude: 21.238826852034407,
        },
        {
          id: 17,
          latitude: 52.24575958521437,
          longitude: 21.253579858772657,
        },
        {
          id: 17,
          latitude: 52.25328184662169,
          longitude: 21.254647642129616,
        },
        {
          id: 17,
          latitude: 52.253383449756036,
          longitude: 21.25257211547847,
        },
        {
          id: 17,
          latitude: 52.263118936851995,
          longitude: 21.254055466512842,
        },
        {
          id: 17,
          latitude: 52.260649509537565,
          longitude: 21.227614662720672,
        },

        {
          id: 17,
          latitude: 52.25610038291619,
          longitude: 21.190318047948523,
        },
      ],
    },
    {
      id: 18,
      name: "Wawer",
      pinLatitude: 52.195577358175576,
      pinLongitude: 21.1798130713931,
      border_coords: [
        {
          id: 18,
          latitude: 52.24645803097272,
          longitude: 21.18413827306914,
        },
        {
          id: 18,
          latitude: 52.24529814493722,
          longitude: 21.17656214247698,
        },
        {
          id: 18,
          latitude: 52.243594528654185,
          longitude: 21.173236621319216,
        },
        {
          id: 18,
          latitude: 52.24166529708718,
          longitude: 21.163632415251676,
        },
        {
          id: 18,
          latitude: 52.24243318197013,
          longitude: 21.163271576831864,
        },
        {
          id: 18,
          latitude: 52.242261940273934,
          longitude: 21.16220698905891,
        },
        {
          id: 18,
          latitude: 52.2431237302988,
          longitude: 21.16179200048097,
        },
        {
          id: 18,
          latitude: 52.23913846707605,
          longitude: 21.141607453518613,
        },
        {
          id: 18,
          latitude: 52.24373032750993,
          longitude: 21.139076736924828,
        },

        {
          id: 18,
          latitude: 52.23895155595239,
          longitude: 21.132832732754636,
        },

        {
          id: 18,
          latitude: 52.232485204978886,
          longitude: 21.125160776481337,
        },

        {
          id: 18,
          latitude: 52.23237770478838,
          longitude: 21.119058448494325,
        },

        {
          id: 18,
          latitude: 52.21498695144786,
          longitude: 21.093176199598428,
        },
        { id: 18, latitude: 52.21102077544874, longitude: 21.09968606447564 },
        {
          id: 18,
          latitude: 52.20511982548866,
          longitude: 21.102399727797767,
        },
        {
          id: 18,
          latitude: 52.19388044383675,
          longitude: 21.105709996703023,
        },
        {
          id: 18,
          latitude: 52.187677218425264,
          longitude: 21.10896682644781,
        },
        {
          id: 18,
          latitude: 52.180389656715825,
          longitude: 21.11946819965362,
        },
        {
          id: 18,
          latitude: 52.17330827393472,
          longitude: 21.132308991482272,
        },
        {
          id: 18,
          latitude: 52.16133486852183,
          longitude: 21.14240152470782,
        },
        {
          id: 18,
          latitude: 52.14471868819128,
          longitude: 21.165311850281565,
        },
        {
          id: 18,
          latitude: 52.14663130779156,
          longitude: 21.175561187331418,
        },
        {
          id: 18,
          latitude: 52.14837748839588,
          longitude: 21.17582621599937,
        },
        {
          id: 18,
          latitude: 52.150528223023706,
          longitude: 21.188401540382504,
        },
        {
          id: 18,
          latitude: 52.14943169549896,
          longitude: 21.188798128485022,
        },

        {
          id: 18,
          latitude: 52.15203651671352,
          longitude: 21.215184995543748,
        },
        {
          id: 18,
          latitude: 52.15871716716331,
          longitude: 21.2341369250727,
        },
        {
          id: 18,
          latitude: 52.153115770094004,
          longitude: 21.248539690193688,
        },
        {
          id: 18,
          latitude: 52.151522396256254,
          longitude: 21.246886393627864,
        },
        {
          id: 18,
          latitude: 52.14731992496628,
          longitude: 21.25506958592927,
        },
        {
          id: 18,
          latitude: 52.15340289410263,
          longitude: 21.262628461253332,
        },
        {
          id: 18,
          latitude: 52.157944008726325,
          longitude: 21.253815221459835,
        },
        {
          id: 18,
          latitude: 52.16056274935909,
          longitude: 21.25635632132038,
        },
        {
          id: 18,
          latitude: 52.16070634923062,
          longitude: 21.256215449413155,
        },
        {
          id: 18,
          latitude: 52.16627592878389,
          longitude: 21.261833893808227,
        },
        {
          id: 18,
          latitude: 52.166855662736005,
          longitude: 21.267599052104554,
        },
        {
          id: 18,
          latitude: 52.1725967330387,
          longitude: 21.267365205055725,
        },
        {
          id: 18,
          latitude: 52.17196491919073,
          longitude: 21.270969261268654,
        },
        {
          id: 18,
          latitude: 52.181882156625875,
          longitude: 21.2603289723325,
        },
        {
          id: 18,
          latitude: 52.18503863283245,
          longitude: 21.26589949354723,
        },
        {
          id: 18,
          latitude: 52.19635334394813,
          longitude: 21.238715123224708,
        },
        {
          id: 18,
          latitude: 52.197511294278954,
          longitude: 21.21584798638195,
        },
        {
          id: 18,
          latitude: 52.20883379036732,
          longitude: 21.214631524364556,
        },
        {
          id: 18,
          latitude: 52.21299425980994,
          longitude: 21.214857013779344,
        },
        {
          id: 18,
          latitude: 52.220157713012235,
          longitude: 21.20628932305202,
        },
        {
          id: 18,
          latitude: 52.22820587611794,
          longitude: 21.207184318727357,
        },
        {
          id: 18,
          latitude: 52.22977376169123,
          longitude: 21.211528167761134,
        },
        {
          id: 18,
          latitude: 52.23423316839582,
          longitude: 21.197250525202172,
        },
      ],
    },
  ]);

  // useEffect(() => {
  //   if (wantToShareLocation) {
  //     (async () => {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         setErrorMsg("Permission to access location was denied");
  //         return;
  //       }

  //       let dd = await Location.getCurrentPositionAsync({});
  //       setLocation(dd);
  //       fitsToCoordsHigher({
  //         latitude: dd.coords.latitude,
  //         longitude: dd.coords.longitude,
  //       });
  //     })();

  //     const interval = setInterval(async () => {
  //       let dd = await Location.getCurrentPositionAsync({});
  //       setLocation(dd);
  //       if (followLocation) {
  //         fitsToCoordsHigher({
  //           latitude: dd.coords.latitude,
  //           longitude: dd.coords.longitude,
  //         });
  //       }
  //     }, 5000);

  //     return () => clearInterval(interval);
  //   }
  // }, [wantToShareLocation]);

  const helper = () => {
    if (coords.length == 0) {
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(e) => {
          setRegion(e);
        }}
        rotateEnabled={false}
      >
        <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {/* {location && wantToShareLocation && <CurrentLocation />}
        <Markers /> */}
        {coords.map((el, index) => {
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
        })}

        {/* <Traces /> */}
      </MapView>

      {/* <Cards /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
