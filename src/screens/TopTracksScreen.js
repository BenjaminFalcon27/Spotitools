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
import { fetchAllTracks } from "../config/dbCalls";
import { Image } from "react-native";
import PlayButton from "../components/PlayButton";

export default function TopTracksScreen() {
  const [trackInfo, setTrackInfo] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await fetchAllTracks();
        const initialSounds = [];
        const initialIsPlaying = [];
        tracks.forEach(() => {
          initialSounds.push(undefined);
          initialIsPlaying.push(false);
        });
        setTrackInfo(tracks);
        setSounds(initialSounds);
        setIsPlaying(initialIsPlaying);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTracks();
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

  const playButton = (index) => {
    return (
      <PlayButton
        track={trackInfo[index]}
        isPlaying={isPlaying[index]}
        setIsPlaying={() =>
          handleTogglePlayback(trackInfo[index].previewUrl, index)
        }
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      {trackInfo.map((track, index) => (
        <View key={index} style={styles.postContainer}>
          <View style={styles.coverContainer}>
            <Image
              source={{ uri: track.album.images[0].url }}
              style={styles.cover}
            />
          </View>
          <View style={styles.trackInfo}>
            <Text style={styles.user}>{track.name}</Text>
            <Text style={styles.text}>Artiste: {track.artist}</Text>
            <Text style={styles.music}>Album: {track.album.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleTogglePlayback(track.previewUrl, index)}
            style={styles.playerContainer}
          >
            {playButton(index)}
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
  playerIcon: {
    fontSize: 24,
    color: "white",
  },
  coverContainer: {
    alignItems: "center",
    width: "20%",
  },
  cover: {
    width: 75,
    height: 75,
  },
  trackInfo: {
    width: "50%",
    marginLeft: "-10",
  },
  playerContainer: {
    width: "20%",
    alignItems: "center",
  },
});
