import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import theme from "../config/theme";
import { dbRealtime, db } from "../config/firebaseConfig";
import { ref, get, child } from "firebase/database";
import { Audio } from "expo-av";
import {
  onSnapshot,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import PostsList from "../components/PostsList";
import NewPost from "../components/NewPost";
import { fetchAllPosts } from "../config/dbCalls";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingPost, setCreatingPost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchAllPosts();
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // when a new post is created, fetch all posts again
  const handlePostCreated = () => {
    if (creatingPost) return;

    const fetchPosts = async () => {
      try {
        // we dont want to fetch posts while creating a new post
        setCreatingPost(true);
        const fetchedPosts = await fetchAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setCreatingPost(false);
      }
    };

    fetchPosts();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Feed</Text>
      <NewPost onPostCreated={handlePostCreated} disabled={creatingPost} />
      <PostsList posts={posts} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: theme.colors.black,
    marginTop: 50,
    width: "100%",
  },
  title: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
