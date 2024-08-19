import { Stack } from "expo-router";

const StackTimetablesLayout = () => {
  return (
    <Stack initialRouteName="timetables">
      <Stack.Screen name="timetables" />
    </Stack>
  );
};

export default StackTimetablesLayout;
