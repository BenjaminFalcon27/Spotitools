import React, { useRef, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import theme from "../config/theme";
import { auth, db } from "../config/firebaseConfig";

export default function PlayButton({ track, isPlaying, setIsPlaying }) {
  const animRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      animRef.current.play();
    } else {
      animRef.current.reset();
    }
  }, [isPlaying]);

  const handleTogglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Pressable style={styles.button} onPress={handleTogglePlayback}>
      <LottieView
        ref={animRef}
        source={require("../../assets/PlayButton.json")}
        style={styles.animation}
        loop={false}
        speed={3}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 50,
    height: 50,
  },
});
