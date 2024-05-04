import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "react-native";
import theme from "../config/theme";
import UpvoteButton from "./Upvote";
import { auth } from "../config/firebaseConfig";
import { getDoc } from "@firebase/firestore";

const PostCard = ({ post }) => {
  const currentUser = auth.currentUser;
  const authorName = post.userName;
  const textContent = post.textContent;
  const [isAuthorCurrentUser, setIsAuthorCurrentUser] = useState(false);

  const crownIcon = isAuthorCurrentUser ? (
    <MaterialCommunityIcons
      name="crown"
      size={24}
      color={theme.colors.primary}
    />
  ) : null;

  const fetchIsAuthorCurrentUser = async () => {
    try {
      const userDoc = await getDoc(post.author);
      const userData = userDoc.data();
      setIsAuthorCurrentUser(userData.uid === currentUser.uid);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  fetchIsAuthorCurrentUser();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{crownIcon} {authorName}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.textContent}>{textContent}</Text>
      </View>
      <View style={styles.cardFooter}>
        <UpvoteButton postId={post.pid} />
      </View>
    </View>
  );
};

export default PostCard;

const styles = {
  card: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    color: theme.colors.primary,
  },
  cardTitle: {
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 5,
  },
  cardContent: {
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textContent: {
    color: theme.colors.light,
  },
  upvoteText: {
    // align vertical center
    marginTop: 18,
    color: theme.colors.primary,
  },
};
