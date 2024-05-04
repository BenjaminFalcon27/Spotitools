import React, { useRef, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { auth, db } from "../config/firebaseConfig";
import {
  getDoc,
  getDocs,
  setDoc,
  doc,
  collection,
  query,
  where,
  arrayContains,
} from "@firebase/firestore";
import theme from "../config/theme";

export default function UpvoteButton({ postId }) {
  const animRef = useRef(null);
  const [upvoted, setUpvoted] = useState(false);
  const currentUser = auth.currentUser;
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    const fetchUserLikedPosts = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        const likedPostsRefs = userData.likedPosts;
        const likedPosts = [];

        for (const postRef of likedPostsRefs) {
          const postDoc = await getDoc(postRef);
          likedPosts.push(postDoc.data());
        }
        const likedPostIds = likedPosts.map((post) => post.pid);
        if (likedPostIds) {
          setUpvoted(likedPostIds.includes(postId));
        }
      } catch (error) {
        console.error("Error fetching user liked posts:", error);
      }
    };

    if (currentUser) {
      fetchUserLikedPosts();
      if (upvoted) {
        animRef.current.play();
      }
    }
  }, [currentUser, postId]);

  useEffect(() => {
    const fetchPostUpvotes = async () => {
      try {
        const postDocRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postDocRef);
        const postData = postDoc.data();
        const upvotes = postData.upvotes;
        setUpvotes(upvotes);
      } catch (error) {
        console.error("Error fetching post likes:", error);
      }
    };

    fetchPostUpvotes();
  }, [postId]);

  const handlePress = () => {
    setUpvoted(!upvoted);
    if (upvoted) {
      animRef.current.play();
      // setUpvotes(upvotes + 1);
      // //TODO: Add back here
    } else {
      animRef.current.reset();
      // setUpvotes(upvotes - 1);
      // //TODO: Add back here
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.icon} onPress={handlePress}>
        <LottieView
          ref={animRef}
          style={styles.animation}
          loop={false}
          source={require("../../assets/Upvote.json")}
        />
        <Text style={styles.upvoteText}>{upvotes}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "50%",
  },
  animation: {
    width: "50%",
    height: "100%",
  },
  icon: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 5,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    
  },
  upvoteText: {
    marginLeft: -40,
    marginTop: 12,
    color: "white",
    textAlign: "center",
    flex: 1,
  },
});
