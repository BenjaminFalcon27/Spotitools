import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import theme from "../config/theme";

// Composant pour une publication
function Post({ user, text, music }) {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.user}>{user}</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.music}>{music}</Text>
    </View>
  );
}

export default function FeedScreen() {
  // Exemple de données de publication
  const posts = [
    {
      user: "John Doe",
      text: "Just discovered this amazing song!",
      music: "Song: Artist - Title",
    },
    {
      user: "Jane Smith",
      text: "Feeling nostalgic today...",
      music: "Song: Artist - Title",
    },
    // Ajoutez d'autres publications ici...
  ];

  return (
    <ScrollView style={styles.container}>
      {posts.map((post, index) => (
        <Post
          key={index}
          user={post.user}
          text={post.text}
          music={post.music}
        />
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
});
