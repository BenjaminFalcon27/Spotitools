import React, { useState, useEffect } from "react";
import { doc, collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig.js";
import { fetchAllTracks } from "../config/dbCalls.js"; // Import the function
import theme from "../config/theme";
import { View, TextInput, Pressable, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const NewPost = (props) => {
  const [textContent, setTextContent] = useState("");
  const [musics, setMusics] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);

  // Fetch all tracks when the component mounts
  useEffect(() => {
    const fetchTracks = async () => {
      const tracks = await fetchAllTracks();
      setMusics(tracks);
    };

    fetchTracks();
  }, []);

  const handlePost = async (event) => {
    event.preventDefault();

    const time = Date.now();
    const upvotes = 0;
    const linkedMedia = "";
    const author = doc(db, "users", auth.currentUser.uid);

    // Find the selected track
    const selectedTrack = musics.find((music) => music.id === selectedMusic);

    // Include the selected track's information when creating the new post
    const music = {
      title: selectedTrack.name,
      artist: selectedTrack.artist,
      albumCoverUrl: selectedTrack.album,
    };

    try {
      const postRef = collection(db, "posts");
      // Add a new document with a generated id.
      await addDoc(postRef, {
        textContent,
        author,
        time,
        upvotes,
        linkedMedia,
        music, // Include the music information
      });

      // get the doc created and copy paste his id in a pid field
      const querySnapshot = await getDocs(postRef);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().textContent === textContent &&
          doc.data().time === time
        ) {
          setDoc(doc.ref, { pid: doc.id }, { merge: true });
        }
      });

      props.onPostCreated();

      setTextContent("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.input}
        selectedValue={selectedMusic}
        onValueChange={(itemValue) => setSelectedMusic(itemValue)}
      >
        {musics.map((music) => (
          <Picker.Item
            key={music.id}
            label={`${music.name} by ${music.artist}`}
            value={music.id}
          />
        ))}
      </Picker>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={textContent}
          onChangeText={setTextContent}
        />
        <Pressable style={styles.button} onPress={handlePost}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewPost;

const styles = {
  container: {
    padding: 10,
    backgroundColor: theme.colors.black,
    width: "100%",
  },
  input: {
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.light,
    borderRadius: 5,
  },
};
