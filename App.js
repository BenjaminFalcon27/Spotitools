import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import List from "./src/screens/List";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebaseConfig";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="List" component={List} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user" + user);
      if (user) {
        setUser(user);
      }
    });
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="List"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
