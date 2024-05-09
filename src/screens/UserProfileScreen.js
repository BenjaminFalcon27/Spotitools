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
import * as WebBrowser from 'expo-web-browser';
const querystring = require('querystring');
import 'url-search-params-polyfill';
import * as Linking from 'expo-linking';
import base64 from 'react-native-base64';


export default function UserProfileScreen(currentUser) {
  const navigation = useNavigation();
  const email = "No email";
  const [isConnected, setIsConnected] = useState(false);
  const buttonText = isConnected ? 'Connected to Spotify!' : 'ajout de mon compte spotify';
  var client_id = '7601ccc32cc449a39a85819a81b1cc4c';
  var client_secret = '7b3498d6ab3a4da0983d3ce5994e9cc7';
  var scope = 'user-read-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-top-read user-library-read user-library-modify user-read-recently-played';
  
  const authorizeWithSpotify = async () => {

    var redirect_uri = Linking.createURL('/--/spotify-callback'); //'exp://pembne0.anonymous.8081.exp.direct/--/--/spotify-callback';//http://localhost:19000/callback;
    console.log("redirect_uri:", redirect_uri);
    try {
      var state = generateRandomString(16);
      const loginUrl = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      });
  
      const listener  = Linking.addEventListener("url", ({ url }) => {
        console.log("URLb:", url);
        if (url.startsWith(redirect_uri)) {
          const urlParams = new URLSearchParams(url.split("?")[1]);
          const code = urlParams.get("code");
          const state = urlParams.get("state");
  
          console.log("Authorization code:", code);
          console.log("State:", state);

          var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri: redirect_uri,
              grant_type: 'authorization_code'
            },
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + base64.encode(client_id + ':' + client_secret),
            },
            json: true
          };

          console.log("fetch Post");
          fetch(authOptions.url, {
            method: 'POST',
            headers: authOptions.headers,
            body: querystring.stringify(authOptions.form)
          })
            .then(response => response.json())
            .then(data => {
              console.log("Response data:", data);  // Log entire response data
              console.log("Access token:", data.access_token);
              console.log("Refresh token:", data.refresh_token);
              setIsConnected(true);
            })
            .catch(error => {
              console.error('Error:', error);
            });

          listener.remove; // Remove listener after handling the URL
        }
      });
      console.log("loginUrl:", loginUrl);
      const ret = await WebBrowser.openAuthSessionAsync(loginUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
              onPress={authorizeWithSpotify}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
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

  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  });
  const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

  // Redirection vers l'URL d'autorisation Spotify avec les paramètres appropriés
  Linking.openURL(authUrl);
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
