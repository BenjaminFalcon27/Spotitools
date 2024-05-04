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

export default function TopTracksScreen() {
  const [trackInfo, setTrackInfo] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  useEffect(() => {
    const tracksRef = child(ref(dbRealtime), "tracks");

    // Fetching data from Firebase
    get(tracksRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Array to store track information
          const tracks = [];
          const initialSounds = [];
          const initialIsPlaying = [];
          snapshot.forEach((childSnapshot) => {
            const trackData = childSnapshot.val();
            if (trackData.items) {
              trackData.items.forEach((item) => {
                const track = {
                  name: item.name,
                  artist: item.artists[0].name, // Assuming only one artist per track
                  previewUrl: item.preview_url,
                };
                tracks.push(track);
                initialSounds.push(undefined);
                initialIsPlaying.push(false);
              });
            }
          });
          setTrackInfo(tracks);
          setSounds(initialSounds);
          setIsPlaying(initialIsPlaying);
        } else {
          console.log("No tracks available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      const sound = sounds[currentTrackIndex];
      if (sound) {
        const updatePlaybackStatus = (status) => {
          if (!status.isPlaying) {
            const newIsPlaying = [...isPlaying];
            newIsPlaying[currentTrackIndex] = false;
            setIsPlaying(newIsPlaying);
          }
        };
        sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      }
    }
  }, [currentTrackIndex, isPlaying, sounds]);

  const handleTogglePlayback = async (previewUrl, index) => {
    if (!isPlaying[index]) {
      try {
        // Stop currently playing track, if any
        if (currentTrackIndex !== null && currentTrackIndex !== index) {
          await sounds[currentTrackIndex].stopAsync();
          const newIsPlaying = [...isPlaying];
          newIsPlaying[currentTrackIndex] = false;
          setIsPlaying(newIsPlaying);
        }

        // Start playback for the selected track
        const { sound } = await Audio.Sound.createAsync(
          { uri: previewUrl },
          { shouldPlay: true }
        );
        const newSounds = [...sounds];
        newSounds[index] = sound;
        setSounds(newSounds);
        const newIsPlaying = [...isPlaying];
        newIsPlaying[index] = true;
        setIsPlaying(newIsPlaying);
        setCurrentTrackIndex(index);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Pause playback if the same track is clicked again
      await sounds[index].pauseAsync();
      const newIsPlaying = [...isPlaying];
      newIsPlaying[index] = false;
      setIsPlaying(newIsPlaying);
      setCurrentTrackIndex(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {trackInfo.map((track, index) => (
        <View key={index} style={styles.postContainer}>
          <View style={styles.trackInfo}>
            <Text style={styles.user}>{track.name}</Text>
            <Text style={styles.text}>{track.artist}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleTogglePlayback(track.previewUrl, index)}
            style={styles.playerContainer}
          >
            <Text style={styles.playerIcon}>
              {isPlaying[index] ? "⏸" : "▶️"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    padding: 20,
    marginTop: 50,
  },
  postContainer: {
    marginTop: 20,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  user: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: theme.colors.light,
    fontSize: 16,
    marginBottom: 5,
  },
  music: {
    color: theme.colors.light,
    fontSize: 14,
  },
  trackInfo: {
    flex: 1,
  },
  playerIcon: {
    fontSize: 24,
    color: "white",
  },
});
