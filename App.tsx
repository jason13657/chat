import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamlist } from "./src/types";
import ChatScreen from "./src/screens/ChatScreen";

const Stack = createNativeStackNavigator<RootStackParamlist>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen component={LoginScreen} name="Login" options={{ headerShown: false }} />
        <Stack.Screen component={HomeScreen} name="Home" options={{ headerShown: false }} />
        <Stack.Screen component={ChatScreen} name="Chat" options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
