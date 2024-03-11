import React from "react";
import { View, StyleSheet } from "react-native";
import FakeForm from "./src/components/FakeForm";

export default function App() {
  return (
    <View style={styles.container}>
      <FakeForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
