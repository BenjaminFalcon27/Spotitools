import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../config/theme";

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={[
        theme.gradient.principal,
        theme.gradient.shade1,
        theme.gradient.shade2,
        theme.gradient.shade3,
        theme.gradient.black,
      ]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.6 }}
    >
      <View style={styles.content}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 300, height: 100 }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.registerText}>
          Je n'ai pas encore de compte,{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            créer un compte
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.sizes.h2,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 30,
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  buttonText: {
    color: theme.colors.black,
    textAlign: "center",
  },
  registerText: {
    color: theme.colors.white,
    fontSize: theme.sizes.h6,
  },
  registerLink: {
    color: theme.colors.white,
    textDecorationLine: "underline",
  },
});
