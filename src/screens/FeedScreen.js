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

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);

        const fetchedPosts = [];
        for (const doc of querySnapshot.docs) {
          const postData = doc.data();
          const userRef = postData.author;
          const userEmail = await fetchUserEmail(userRef);
          const userName = await fetchUserName(userRef);
          fetchedPosts.push({ ...postData, userEmail, userName }); // Add userEmail to post data
        }
        // Sort posts by most recent
        fetchedPosts.sort((a, b) => b.time - a.time);

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const fetchUserEmail = async (userRef) => {
    try {
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      return userData.email;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchUserName = async (userRef) => {
    try {
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      return userData.name;
    } catch (error) {
      console.errorsetPosts("Error fetching user:", error);
    }
  };

  const handlePostCreated = () => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);

        const fetchedPosts = [];
        for (const doc of querySnapshot.docs) {
          const postData = doc.data();
          const userRef = postData.author;
          const userEmail = await fetchUserEmail(userRef);
          const userName = await fetchUserName(userRef);
          fetchedPosts.push({ ...postData, userEmail, userName }); // Add userEmail to post data
        }
        // Sort posts by most recent
        fetchedPosts.sort((a, b) => b.time - a.time);

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Feed</Text>
      <NewPost onPostCreated={handlePostCreated} />
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
