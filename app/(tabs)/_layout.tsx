import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "./../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarLabel: "Główna",
          
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={24} />
          ),
        }}
        name="home"
      />
      <Tabs.Screen
        options={{
          tabBarLabel: "Komunikacja miejska",
          
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="bus" color={color} size={24} />
          ),
        }}
        name="ztm"
        
      />
    </Tabs>
  );
}
