import React, { useRef, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { auth, db } from "../config/firebaseConfig";
import {
  getDoc,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
  increment,
} from "@firebase/firestore";
import theme from "../config/theme";

export default function UpvoteButton({ postId }) {
  const animRef = useRef(null);
  const currentUser = auth.currentUser;
  const [likedPosts, setLikedPosts] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    const fetchUserLikedPostsAndUpvotes = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        setLikedPosts(userData.likedPosts || []);

        const postDocRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postDocRef);
        const postData = postDoc.data();
        setUpvotes(postData.upvotes || 0);

        if (Array.isArray(userData.likedPosts)) {
          const likedPostIds = userData.likedPosts.map((post) => post.pid);
          if (likedPostIds) {
            setUpvoted(likedPostIds.includes(postId));
          }
        }
      } catch (error) {
        console.error("Error fetching user liked posts and upvotes:", error);
      }
    };

    if (currentUser) {
      fetchUserLikedPostsAndUpvotes();
    }
  }, [currentUser, postId]);

  const handlePress = async () => {
    setUpvoted(!upvoted);
    const postDocRef = doc(db, "posts", postId);
    const userDocRef = doc(db, "users", currentUser.uid);

    if (!upvoted) {
      animRef.current.play();
      // Ajouter le postId à la liste des posts aimés par l'utilisateur
      await setDoc(
        userDocRef,
        {
          likedPosts: arrayUnion(postId),
        },
        { merge: true }
      );

      // Augmenter le nombre d'upvotes du post
      await setDoc(
        postDocRef,
        {
          upvotes: increment(1),
        },
        { merge: true }
      );
      // Update local state
      setUpvotes(upvotes + 1);
      setLikedPosts([...likedPosts, { pid: postId }]);
      setUpvoted(true);
    } else {
      animRef.current.reset();
      // Supprimer le postId de la liste des posts aimés par l'utilisateur
      await setDoc(
        userDocRef,
        {
          likedPosts: arrayRemove(postId),
        },
        { merge: true }
      );

      // Diminuer le nombre d'upvotes du post
      await setDoc(
        postDocRef,
        {
          upvotes: increment(-1),
        },
        { merge: true }
      );
      // Update local state
      setUpvotes(upvotes - 1);
      setLikedPosts(likedPosts.filter((post) => post.pid !== postId));
      setUpvoted(false);
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
