import React, { useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {

  

  useEffect(() => {
    // Ajouter un gestionnaire d'URL pour détecter les liens profonds
    const handleDeepLink = event => {
      const { url } = event;
      if (url) {
        // Extraire le chemin de l'URL
        const path = url.split('//')[1];
        // Naviguer vers l'écran correspondant au chemin de l'URL
        if (path === 'spooticonnexion') {
          // Naviguer vers l'écran DeepLinkScreen si le lien profond est '/deeplink'
          navigationRef.current?.navigate('UserProfile');
        }
      }
    };

    // Ajouter un écouteur pour les liens profonds
    Linking.addEventListener('url', handleDeepLink);

    // Supprimer l'écouteur lors du démontage du composant
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
