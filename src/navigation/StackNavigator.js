import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FakeForm from "../components/FakeForm";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FakeForm" component={FakeForm} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
