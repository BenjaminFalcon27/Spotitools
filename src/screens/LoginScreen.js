// screens/LoginScreen.js
import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

// TODO: Create the screen with Formik form and Yup validation
const LoginScreen = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;
