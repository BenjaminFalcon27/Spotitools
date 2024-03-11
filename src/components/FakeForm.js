import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ref, set } from "firebase/database";
import db from "../config/database";

export default function FakeForm() {
  const [title, setTitle] = useState("Hello World");
  const [artist, setArtist] = useState("Adele");
  const [album, setAlbum] = useState("21");
  const [year, setYear] = useState("2011");

  function create() {
    set(ref(db, "songs/" + title), {
      title: title,
      artist: artist,
      album: album,
      year: year,
    })
      .then(() => {
        alert("Data set.");
      })
      .catch((error) => {
        alert("Error: ", error);
      });
  }

  return (
    <View style={styles.container}>
      <Text>AddData</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Artist"
        value={artist}
        onChangeText={(text) => setArtist(text)}
      />
      <TextInput
        placeholder="Album"
        value={album}
        onChangeText={(text) => setAlbum(text)}
      />
      <TextInput
        placeholder="Year"
        value={year}
        onChangeText={(text) => setYear(text)}
      />
      <Button title="Add" onPress={create} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
