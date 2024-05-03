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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import theme from "../config/theme";
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const ensurePasswordSecurity = (password) => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    if (!password.match(/[A-Z]/)) {
      alert("Password must contain at least one uppercase letter");
      return false;
    }
    if (!password.match(/[a-z]/)) {
      alert("Password must contain at least one lowercase letter");
      return false;
    }
    if (!password.match(/[0-9]/)) {
      alert("Password must contain at least one number");
      return false;
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      alert("Password must contain at least one special character");
      return false;
    }
    return true;
  };

  const register = async () => {
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        requests: [],
        friends: [],
        token: "",
        avatar: "",
        name: "",
      });
      // then login and redirect to home
      
      navigation.navigate("Home");
    } catch (error) {
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Inscription</Text>
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
      <TextInput
        style={styles.input}
        value={passwordConfirmation}
        placeholder="Confirmer le mot de passe"
        placeholderTextColor={theme.colors.light}
        autoCapitalize="none"
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />
      <Text style={styles.subtitle}>
        *Le mot de passe doit contenir au moins 6 caractères, une majuscule, une
        minuscule, un chiffre et un caractère spécial.
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.buttonText}>Créer un compte</Text>
          </TouchableOpacity>
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            J'ai déjà un compte
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
  loginLink: {
    color: theme.colors.primary,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  subtitle: {
    color: theme.colors.light,
    fontSize: theme.sizes.verySmall,
    marginBottom: 20,
  },
});
