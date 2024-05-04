import React from "react";
import { ScrollView, View, Text } from "react-native";
import PostCard from "./PostCard";

export default function PostsList ({ posts }) {
  return (
    <ScrollView style={styles.postsContainer}>
      {posts.map((post) => (
        <PostCard key={post.pid} post={post} />
      ))}
    </ScrollView>
  );
}

const styles = {
  postsContainer: {
    padding: 20,
    width: "100%",
  },
};


