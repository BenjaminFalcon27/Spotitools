// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import { getAllUsers } from "../services/firebaseService";

// const UsersScreen = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const userList = await getAllUsers();
//         setUsers(userList);
//       } catch (error) {
//         console.error(
//           "Erreur lors de la récupération des utilisateurs: ",
//           error
//         );
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.userContainer}>
//             <Text style={styles.userName}>{item.name}</Text>
//             <Text>{item.email}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   userContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   userName: {
//     fontWeight: "bold",
//   },
// });

// export default UsersScreen;
