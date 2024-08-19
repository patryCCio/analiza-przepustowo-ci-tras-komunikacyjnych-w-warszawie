import { Stack } from "expo-router";

const StackZTMLayout = () => {
  return (
    <Stack initialRouteName="ztm" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ztm" />
      <Stack.Screen name="(traces)" />
    </Stack>
  );
};

export default StackZTMLayout;
