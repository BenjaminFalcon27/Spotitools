import React, { useState, useEffect, useLayoutEffect } from "react";
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
import { db, auth, getAllUsers } from "../config/firebaseConfig";
import { onSnapshot, collection, getDocs } from "firebase/firestore";

export default function UsersListScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);

        const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Liste des utilisateurs</Text>
      <ScrollView style={styles.usersContainer}>
        {users.map((user) => (
          <TouchableOpacity key={user.uid} style={styles.user}>
            <Text style={styles.userText}>{user.email}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginVertical: 20,
  },
  usersContainer: {
    width: "100%",
  },
  user: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
  },
  userText: {
    color: theme.colors.white,
  },
});
