import { View, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import * as Linking from 'expo-linking';


export default function App() {
  const navigationRef = useRef();
  useEffect(() => {
    // Handle deep link when app is running in the background
    const handleDeepLink = (event) => {
      const { url } = event;
      console.log('event logt:', url);
      if (url) {
        if (url.startsWith('exp://pembne0-anonymous-8081.exp.direct?UserProfiler')) {
          console.log('go to user profiler');
          navigationRef.current?.navigate('UserProfile');
        }
      }
    };

    // Add event listener for 'url' event
    const unsubscribe = Linking.addEventListener("url", handleDeepLink);
    //const unsubscribe =Linking.addEventListener("url", handleDeepLink);

    // Handle deep link if app was opened by a deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    // Remove event listener when component unmounts
    return () => {
      unsubscribe.remove();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
}
