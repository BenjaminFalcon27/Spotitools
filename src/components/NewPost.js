import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { db, auth } from "../config/firebaseConfig";
import { setDoc, addDoc, collection, doc, getDocs } from "firebase/firestore";
import theme from "../config/theme";

export default function NewPost(props) {
  const [textContent, setTextContent] = useState("");

  const handlePost = async () => {
    const time = Date.now();
    const upvotes = 0;
    const linkedMedia = "";
    const author = doc(db, "users", auth.currentUser.uid);

    try {
      const postRef = collection(db, "posts");
      // Add a new document with a generated id.
      await addDoc(postRef, {
        textContent,
        author,
        time,
        upvotes,
        linkedMedia,
      });

      // get the doc created and copy paste his id in a pid field
      const querySnapshot = await getDocs(postRef);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().textContent === textContent &&
          doc.data().time === time
        ) {
          setDoc(doc.ref, { pid: doc.id }, { merge: true });
        }
      });

      props.onPostCreated();

      setTextContent("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Quoi de neuf ?"
        value={textContent}
        onChangeText={setTextContent}
      />
      {/* Ici ajouter une musique */}
      <Pressable style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </Pressable>
    </View>
  );
}

const styles = {
  container: {
    padding: 10,
    backgroundColor: theme.colors.black,
    width: "100%",
  },
  input: {
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
  },
};
