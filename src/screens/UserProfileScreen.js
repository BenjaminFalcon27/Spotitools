import React, { useState } from "react";
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


const querystring = require('querystring');
const path = require('path');
var client_id = '7601ccc32cc449a39a85819a81b1cc4c';
var redirect_uri = 'http://192.168.56.1:8888/';

export default function UserProfileScreen(currentUser) {
  const navigation = useNavigation();
  const email = "No email";

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Mon Profil</Text>

      <ScrollView style={styles.profileContainer}>
        <View style={styles.header}>
          <Text style={styles.emailTitle}>Email:</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        <ScrollView style={styles.favoriteContainer}>
          <Text style={styles.favoriteTitle}>ma connexion:</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => connectToSpotify()}
            >
              <Text style={styles.buttonText}>ajout de mon compte spotify</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
      </ScrollView>
      <View style={styles.disconnectContainer}>
        <View style={styles.disconnectButtonContainer}>
          <TouchableOpacity
            style={styles.buttonDisconnect}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// Fonction pour générer une chaîne aléatoire de longueur donnée
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function connectToSpotify()
{
  // Générer un état aléatoire
  const state = generateRandomString(16);
  // Définir la portée pour l'autorisation Spotify
  const scope = 'user-read-private user-read-email';

  // Redirection vers l'URL d'autorisation Spotify avec les paramètres appropriés
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
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
    height: "100%",
  },
  profileContainer: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emailTitle: {
    color: theme.colors.white,
    fontSize: 18,
    marginBottom: 5,
  },
  emailText: {
    color: theme.colors.light,
    fontSize: 16,
    marginLeft: 10,
  },
  favoriteContainer: {
    marginTop: 20,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: "10%",
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
    height: "10%",
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
});
