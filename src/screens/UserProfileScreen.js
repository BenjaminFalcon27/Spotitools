import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import theme from "../config/theme";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../config/firebaseConfig";
import { collection, doc } from "firebase/firestore";
import { fetchUserById } from "../config/dbCalls";

export default function UserProfileScreen(route) {
  const user_id = route.route.params.user_id;
  const navigation = useNavigation();
  const currentUser = auth.currentUser;
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const disconnect = () => {
    auth.signOut();
    navigation.navigate("Login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserById(route.route.params.user_id);
        const email = user.email;
        const name = user.name;
        setEmail(email);
        setUser(user);
        setName(name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [navigation, user_id, route.route.params.user_id]);

  const isCurrentUserProfile = currentUser.uid === route.route.params.user_id;

  if (isCurrentUserProfile) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView style={styles.profileContainer}>
          <Text style={styles.title}>Mon Profil</Text>
          <View style={styles.userInfosContainer}>
            <Text style={styles.infosTitle}>Email:</Text>
            <Text style={styles.infosText}>{email}</Text>
            <Text style={styles.infosTitle}>Token:</Text>
            <Text style={styles.infosText}>Token Spotify non valide</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Se connecter à Spotify</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.favoriteContainer}>
            <Text style={styles.favoriteTitle}>Mes favoris:</Text>
            <Text style={styles.favoriteText}>Aucun favori pour le moment</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addNewFavorite()}
              >
                <Text style={styles.buttonText}>Ajouter un favori</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={styles.friendsContainer}>
            <Text style={styles.friendsTitle}>Mes amis:</Text>
            <Text style={styles.friendsText}>Aucun ami pour le moment</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addNewFriend()}
              >
                <Text style={styles.buttonText}>Ajouter un ami</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.disconnectButtonContainer}>
            <TouchableOpacity
              style={styles.buttonDisconnect}
              onPress={() => disconnect()}
            >
              <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView style={styles.profileContainer}>
          <Text style={styles.title}>{`Profil de ${name}`}</Text>
          <View style={styles.userInfosContainer}>
            <Text style={styles.infosTitle}>Email:</Text>
            <Text style={styles.infosText}>{email}</Text>
          </View>
          <ScrollView style={styles.favoriteContainer}>
            <Text style={styles.favoriteTitle}>Favoris de {name}:</Text>
            <Text style={styles.favoriteText}>Aucun favori pour le moment</Text>
          </ScrollView>
          <ScrollView style={styles.backToMyProfileContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("UserProfile", { user_id: currentUser.uid })
              }
            >
              <Text style={styles.buttonText}>Retour à mon profil</Text>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function addNewFavorite() {
  alert("Ajouter un favori");
}

function addNewFriend() {
  alert("Ajouter un ami");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: theme.colors.black,
    marginTop: 50,
    height: "80%",
  },
  profileContainer: {
    width: "100%",
    padding: 20,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfosContainer: {
    padding: 10,
    width: "100%",
  },
  infosTitle: {
    color: theme.colors.white,
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },
  infosText: {
    color: theme.colors.light,
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },
  favoriteContainer: {
    marginTop: 20,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  favoriteTitle: {
    color: theme.colors.white,
    fontSize: 18,
    marginBottom: 5,
  },
  favoriteText: {
    color: theme.colors.light,
    fontSize: 16,
    marginLeft: 10,
  },
  friendsContainer: {
    marginTop: 20,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  friendsTitle: {
    color: theme.colors.white,
    fontSize: 18,
    marginBottom: 5,
  },
  friendsText: {
    color: theme.colors.light,
    fontSize: 16,
    marginLeft: 10,
  },
  disconnectContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonDisconnect: {
    backgroundColor: theme.colors.danger,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  disconnectButtonContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.light,
    borderRadius: 5,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
    // center
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
  },
  backToMyProfileContainer: {
    marginTop: 20,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
