import BarMulti from "./BarMulti";
import LineMulti from "./LineMulti";

const Diagrams = ({
  actualDiagramIndex,
  type,
  actualTime,
  data,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
}) => {
  return (
    <>
      {actualDiagramIndex == 0 && type == "speed" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="km/h"
              data={data.data_0}
              d={actualTime}
              textDiagram={"Średnia prędkość pomiędzy przystankami (aktualnie)"}
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="km/h"
              data={data.data_1}
              d={actualTime}
              textDiagram={"Średnia prędkość pomiędzy przystankami (za 15 min)"}
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="km/h"
              data={data.data_2}
              d={actualTime}
              textDiagram={"Średnia prędkość pomiędzy przystankami (za 30 min)"}
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "confidence" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="%"
              data={data2.data_0}
              d={actualTime}
              textDiagram={
                "Średnia pewność pomiarów pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="%"
              data={data2.data_1}
              d={actualTime}
              textDiagram={
                "Średnia pewność pomiarów pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="%"
              data={data2.data_2}
              d={actualTime}
              textDiagram={
                "Średnia pewność pomiarów pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "jamFactor" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix=""
              data={data3.data_0}
              d={actualTime}
              textDiagram={
                "Współczynnik zakorkowania pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix=""
              data={data3.data_1}
              d={actualTime}
              textDiagram={
                "Współczynnik zakorkowania pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix=""
              data={data3.data_2}
              d={actualTime}
              textDiagram={
                "Współczynnik zakorkowania pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "freeFlow" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="km/h"
              data={data4.data_0}
              d={actualTime}
              textDiagram={
                "Prędkość swobodnego przepływu pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="km/h"
              data={data4.data_1}
              d={actualTime}
              textDiagram={
                "Prędkość swobodnego przepływu pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="km/h"
              data={data4.data_2}
              d={actualTime}
              textDiagram={
                "Prędkość swobodnego przepływu pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "populationDensity" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="os/km2"
              data={data5.data_0}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="os/km2"
              data={data5.data_1}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="os/km2"
              data={data5.data_2}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "avgLanes" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="n"
              data={data6.data_0}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="n"
              data={data6.data_1}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="n"
              data={data6.data_2}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "c" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="poj/h"
              data={data7.data_0}
              d={actualTime}
              textDiagram={
                "Przepustowość drogi pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="poj/h"
              data={data7.data_1}
              d={actualTime}
              textDiagram={
                "Przepustowość drogi pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="poj/h"
              data={data7.data_2}
              d={actualTime}
              textDiagram={
                "Przepustowość drogi pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "travelTimeWithDelays" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="min"
              data={data8.data_0}
              d={actualTime}
              textDiagram={
                "Przewidywany czas przejazdu pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="min"
              data={data8.data_1}
              d={actualTime}
              textDiagram={
                "Przewidywany czas przejazdu pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="min"
              data={data8.data_2}
              d={actualTime}
              textDiagram={
                "Przewidywany czas przejazdu pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "totalDelay" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="min"
              data={data9.data_0}
              d={actualTime}
              textDiagram={
                "Opóźnienie spowodowane przez skrzyżowania pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="min"
              data={data9.data_1}
              d={actualTime}
              textDiagram={
                "Opóźnienie spowodowane przez skrzyżowania pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="min"
              data={data9.data_2}
              d={actualTime}
              textDiagram={
                "Opóźnienie spowodowane przez skrzyżowania pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 0 && type == "finalSpeed" && (
        <>
          {actualTime == 0 && (
            <BarMulti
              suffix="km/h"
              data={data10.data_0}
              d={actualTime}
              textDiagram={
                "Prędkość rzeczywista pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <BarMulti
              suffix="km/h"
              data={data10.data_1}
              d={actualTime}
              textDiagram={
                "Prędkość rzeczywista pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <BarMulti
              suffix="km/h"
              data={data10.data_2}
              d={actualTime}
              textDiagram={
                "Prędkość rzeczywista pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "speed" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="km/h"
              data={data.data_0}
              d={actualTime}
              textDiagram={"Średnia prędkość pomiędzy przystankami (aktualnie)"}
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="km/h"
              data={data.data_1}
              d={actualTime}
              textDiagram={"Średnia prędkość pomiędzy przystankami (za 15 min)"}
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="km/h"
              data={data.data_2}
              d={actualTime}
              textDiagram={"Średnia prędkość pomiędzy przystankami (za 30 min)"}
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "confidence" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="%"
              data={data2.data_0}
              d={actualTime}
              textDiagram={
                "Średnia pewność pomiarów pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="%"
              data={data2.data_1}
              d={actualTime}
              textDiagram={
                "Średnia pewność pomiarów pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="%"
              data={data2.data_2}
              d={actualTime}
              textDiagram={
                "Średnia pewność pomiarów pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "jamFactor" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix=""
              data={data3.data_0}
              d={actualTime}
              textDiagram={
                "Współczynnik zakorkowania pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix=""
              data={data3.data_1}
              d={actualTime}
              textDiagram={
                "Współczynnik zakorkowania pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix=""
              data={data3.data_2}
              d={actualTime}
              textDiagram={
                "Współczynnik zakorkowania pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "freeFlow" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="km/h"
              data={data4.data_0}
              d={actualTime}
              textDiagram={
                "Prędkość swobodnego przepływu pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="km/h"
              data={data4.data_1}
              d={actualTime}
              textDiagram={
                "Prędkość swobodnego przepływu pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="km/h"
              data={data4.data_2}
              d={actualTime}
              textDiagram={
                "Prędkość swobodnego przepływu pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "populationDensity" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="os/km2"
              data={data5.data_0}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="os/km2"
              data={data5.data_1}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="os/km2"
              data={data5.data_2}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "avgLanes" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="n"
              data={data6.data_0}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="n"
              data={data6.data_1}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="n"
              data={data6.data_2}
              d={actualTime}
              textDiagram={
                "Srędnia gęstość zaludnienia pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "c" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="poj/h"
              data={data7.data_0}
              d={actualTime}
              textDiagram={
                "Przepustowość drogi pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="poj/h"
              data={data7.data_1}
              d={actualTime}
              textDiagram={
                "Przepustowość drogi pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="poj/h"
              data={data7.data_2}
              d={actualTime}
              textDiagram={
                "Przepustowość drogi pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "travelTimeWithDelays" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="min"
              data={data8.data_0}
              d={actualTime}
              textDiagram={
                "Przewidywany czas przejazdu pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="min"
              data={data8.data_1}
              d={actualTime}
              textDiagram={
                "Przewidywany czas przejazdu pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="min"
              data={data8.data_2}
              d={actualTime}
              textDiagram={
                "Przewidywany czas przejazdu pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "totalDelay" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="min"
              data={data9.data_0}
              d={actualTime}
              textDiagram={
                "Opóźnienie spowodowane przez skrzyżowania pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="min"
              data={data9.data_1}
              d={actualTime}
              textDiagram={
                "Opóźnienie spowodowane przez skrzyżowania pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="min"
              data={data9.data_2}
              d={actualTime}
              textDiagram={
                "Opóźnienie spowodowane przez skrzyżowania pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}

      {actualDiagramIndex == 1 && type == "finalSpeed" && (
        <>
          {actualTime == 0 && (
            <LineMulti
              suffix="km/h"
              data={data10.data_0}
              d={actualTime}
              textDiagram={
                "Prędkość rzeczywista pomiędzy przystankami (aktualnie)"
              }
            />
          )}

          {actualTime == 1 && (
            <LineMulti
              suffix="km/h"
              data={data10.data_1}
              d={actualTime}
              textDiagram={
                "Prędkość rzeczywista pomiędzy przystankami (za 15 min)"
              }
            />
          )}

          {actualTime == 2 && (
            <LineMulti
              suffix="km/h"
              data={data10.data_2}
              d={actualTime}
              textDiagram={
                "Prędkość rzeczywista pomiędzy przystankami (za 30 min)"
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default Diagrams;
