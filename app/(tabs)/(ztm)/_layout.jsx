import { Stack } from "expo-router";

const StackZTMLayout = () => {
  return (
    <Stack initialRouteName="ztm">
      <Stack.Screen name="ztm" />
      <Stack.Screen name="ztmInfo" />
    </Stack>
  );
};

export default StackZTMLayout;
