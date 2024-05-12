import { dbRealtime, db, auth } from "./firebaseConfig";
import { ref, get, child } from "firebase/database";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  setDoc,
  setDocs,
} from "firebase/firestore";

// Fetch all Users in Firestore
export const fetchAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch a User by their ID
export const fetchUserById = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Fetch a User Email
export const fetchUserEmail = async (userRef) => {
  try {
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    return userData.email;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Fetch a User Name
export const fetchUserName = async (userRef) => {
  try {
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    return userData.name;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Fetch all Posts in Firestore
export const fetchAllPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);

    const fetchedPosts = [];
    for (const doc of querySnapshot.docs) {
      const postData = doc.data();
      const userRef = postData.author;
      const userEmail = await fetchUserEmail(userRef);
      const userName = await fetchUserName(userRef);
      if (postData.music !== undefined) {
        const music = postData.music;
        fetchedPosts.push({ ...postData, userEmail, userName, music });
      } else {
        console.log("No music available");
      }
    }
    // Sort posts by most recent
    fetchedPosts.sort((a, b) => b.time - a.time);

    return fetchedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Fetch all tracks in Realtime Database
export const fetchAllTracks = async () => {
  const tracksRef = child(ref(dbRealtime), "tracks");
  try {
    const snapshot = await get(tracksRef);
    if (snapshot.exists()) {
      const tracks = [];
      snapshot.forEach((childSnapshot) => {
        const trackData = childSnapshot.val();
        if (trackData) {
          const track = {
            name: trackData.name,
            artist: trackData.artists[0].name,
            album: trackData.album,
            previewUrl: trackData.preview_url,
            id: trackData.id,
          };

          tracks.push(track);
        }
      });
      return tracks;
    } else {
      console.log("No tracks available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error;
  }
};

// Fetch all tracks ids
export const fetchAllTracksIds = async () => {
  console.log("Fetching all tracks ids");
  const tracksRef = child(ref(dbRealtime), "tracks");

  try {
    const snapshot = await get(tracksRef);
    if (snapshot.exists()) {
      const tracksIds = [];
      snapshot.forEach((childSnapshot) => {
        const trackData = childSnapshot.val();
        if (trackData.items) {
          trackData.items.forEach((item) => {
            tracksIds.push(item.id);
          });
        }
      });
      console.log("Tracks ids fetched:", tracksIds);
      return tracksIds;
    } else {
      console.log("No tracks available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error;
  }
};

// // Fetch favorites tracks of a user
// export const fetchFavoriteTracks = async (uid) => {
//   try {
//     const userRef = doc(db, "users", uid);
//     const userDoc = await getDoc(userRef);
//     const userData = userDoc.data();
//     return userData.favorites;
//   } catch (error) {
//     console.error("Error fetching favorite tracks:", error);
//     throw error;
//   }
// };

// // Add a track to favorites
// export const addFavoriteTrack = async (uid, trackRef) => {
//   try {
//     const userRef = doc(db, "users", uid);
//     const userDoc = await getDoc(userRef);
//     const userData = userDoc.data();
//     const favorites = userData.favorites;
//     // limit to 10 favorites
//     if (favorites.length >= 10) {
//       throw new Error("Maximum number of favorite tracks reached");
//     } else {
//       favorites.push(trackRef);
//       await setDoc(userRef, { favorites }, { merge: true });
//     }
//   } catch (error) {
//     console.error("Error adding favorite track:", error);
//     throw error;
//   }
// };
