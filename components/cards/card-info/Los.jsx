import { Text } from "react-native-paper";
import { Colors } from "../../../constants/Colors";
import { View } from "react-native";
import Title from "../Title";

const Los = () => {
  return (
    <>
      <Title text={"Hours of Service (LOS)"} />
      <View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            A
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Usługi działają przez całą dobę, też w nocy.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            B
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Zapewniona obsługa późnym wieczorem.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            C
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Zapewniona obsługa wczesnym wieczorem.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            D
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Zapewniona obsługa w ciągu dnia.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            E
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Obsługa w godzinach szczytu / ograniczona obsługa w południe.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            F
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Bardzo ograniczona lub brak obsługi.
          </Text>
        </View>
      </View>
      <Title text={"Opis dla skrzyżowań (LOS)"} />
      <View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            A
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Minimalne opóźnienia, czas oczekiwania przy sygnalizacji jest bardzo
            krótki. Płynny ruch, mało zatrzymań, przeważnie brak kolejek.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            B
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Krótkie opóźnienia, lekkie zatrzymania, sporadyczne kolejki przy
            sygnalizacji, ale ruch jest nadal dość płynny.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            C
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Umiarkowane opóźnienia, wyraźnie odczuwalny wpływ sygnalizacji
            świetlnej, ruch zaczyna być mniej płynny, kolejki są widoczne, ale
            akceptowalne.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            D
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Większe opóźnienia, ruch zaczyna być bardziej przerywany, dłuższe
            kolejki, sygnalizacja ma istotny wpływ na płynność ruchu.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            E
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Bardzo duże opóźnienia, znaczne zatrzymania i długie kolejki,
            zbliżające się do granic przepustowości skrzyżowania.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            F
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Nieakceptowalne opóźnienia, bardzo długie kolejki, sygnalizacja
            świetlna przeciążona, a ruch jest poważnie zakłócony. Pojazdy mogą
            czekać na kilku cyklach sygnalizacji, aby przejechać.
          </Text>
        </View>
      </View>
    </>
  );
};

export default Los;
