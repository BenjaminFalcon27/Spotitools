import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Touchable, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import theme from "../config/theme";
import UpvoteButton from "./Upvote";
import { auth } from "../config/firebaseConfig";
import { getDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const PostCard = ({ post }) => {
  const currentUser = auth.currentUser;
  const authorName = post.userName;
  const textContent = post.textContent;
  const albumCoverUrl = post["music"]["albumCoverUrl"]["images"][0]["url"];
  const musicName = post["music"]["title"];
  const musicArtist = post["music"]["artist"];
  console.log(musicName);
  const [isAuthorCurrentUser, setIsAuthorCurrentUser] = useState(false);
  const navigation = useNavigation();

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
  };

  fetchIsAuthorCurrentUser();

  const redirectToUserProfile = (event) => {
    navigation.setParams({ user_id: post.author.id });
    navigation.navigate("Tabs", {
      screen: "UserProfile",
      params: { user_id: post.author.id },
    });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={redirectToUserProfile}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {crownIcon} {authorName}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.textContent}>{textContent}</Text>
      </View>

      <View style={styles.cardContent}>
        <Image
          source={{ uri: albumCoverUrl }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.textContent}>
          {musicName} by {musicArtist}
        </Text>
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
