import { Stack } from "expo-router";

const StackRoutesLayout = () => {
  return (
    <Stack initialRouteName="routes" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="routes" />
      <Stack.Screen name="(timetables)" />
    </Stack>
  );
};

export default StackRoutesLayout;
