import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../context/redux/store";
import { MapContextProvider } from "../context/MapContext";

export default function RootLayout() {
  useFonts({
    "outfit": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <Provider store={store}>
      <MapContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="home"
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </MapContextProvider>
    </Provider>
  );
}
