import { Stack } from "expo-router";

const StackTracesLayout = () => {
  return (
    <Stack initialRouteName="traces" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(routes)" />
      <Stack.Screen name="traces" />
    </Stack>
  );
};

export default StackTracesLayout;
