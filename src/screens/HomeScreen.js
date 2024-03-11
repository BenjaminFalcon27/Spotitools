import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
        <Text style={styles.title}>Bienvenue sur l'application</Text>
        <Button
          title="Se connecter"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="S'inscrire"
          onPress={() => navigation.navigate("Register")}
        />
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
});
