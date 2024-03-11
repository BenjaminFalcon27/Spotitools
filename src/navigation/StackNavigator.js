import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FakeForm from "../components/FakeForm";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FakeForm" component={FakeForm} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
