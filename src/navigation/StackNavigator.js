import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import StartSplashScreen from "../screens/StartSplashScreen";
import FeedScreen from "../screens/FeedScreen";
import UsersListScreen from "../screens/UsersListScreen";
import TopTracksScreen from "../screens/TopTracksScreen";
import theme from "../config/theme";
import { auth } from "../config/firebaseConfig";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const currentUser = auth.currentUser;

  return (
    <Tab.Navigator
      activeColor={theme.colors.primary}
      barStyle={{ backgroundColor: theme.colors.black }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        initialParams={{ user_id: currentUser.uid }}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        key={currentUser.uid}
      />
      <Tab.Screen
        name="UsersList"
        component={UsersListScreen}
        options={{
          tabBarLabel: "Users",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TopTracks"
        component={TopTracksScreen}
        options={{
          tabBarLabel: "Top Tracks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="music" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={StartSplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
