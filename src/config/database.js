import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCHK4su7qJ84zl5MCGoXjjaTr_2c7wMB3s",
  authDomain: "spotitools-19628.firebaseapp.com",
  databaseURL:
    "https://spotitools-19628-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spotitools-19628",
  storageBucket: "spotitools-19628.appspot.com",
  messagingSenderId: "107912612542",
  appId: "1:107912612542:web:b001469fcb385707afacef",
  measurementId: "G-3VK7DT9H46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase();

export default db;
