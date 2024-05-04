import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import theme from "../config/theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const authentication = auth;
  const navigation = useNavigation();

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("Tabs", {
          screen: "UserProfile",
          params: { user_id: userCredential.user.uid },
        });
        // then we want to save the session in the local storage
        AsyncStorage.setItem("user_id", userCredential.user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        placeholderTextColor={theme.colors.light}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Mot de passe"
        placeholderTextColor={theme.colors.light}
        autoCapitalize="none"
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={signin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Créer un compte
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: theme.colors.black,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.sizes.h2,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: 25,
    paddingLeft: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: theme.colors.black,
    fontSize: theme.sizes.body,
  },
  registerLink: {
    color: theme.colors.primary,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
