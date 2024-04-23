import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { auth } from "../config/firebaseConfig";

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={() => auth.signOut()} />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
