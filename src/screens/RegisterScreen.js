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
import { createUserWithEmailAndPassword } from "firebase/auth";
import theme from "../config/theme";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const register = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Login");
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
});
