import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import theme from "../config/theme";
import { dbRealtime } from "../config/firebaseConfig";
import { ref, get, child } from "firebase/database";
import { Audio } from "expo-av";

export default function FeedScreen() {

  return (
    <ScrollView style={styles.container}>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
});
