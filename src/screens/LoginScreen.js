// screens/LoginScreen.js
import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const LoginScreen = (navigation) => {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, result, promptAsync] = useAuthRequest(
    {
      clientId: "7601ccc32cc449a39a85819a81b1cc4c",
      scopes: ["user-read-email", "playlist-modify-public"],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        path: "/callback",
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (result) {
      if (result.type === "success") {
        const { code } = result.params;
        console.log("url", result.url);
        console.log("authentication", result.authentication);
        console.log("code", code);
        navigation.navigate("UserProfile");
      }
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login with Spotify"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
});
