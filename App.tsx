import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Navigations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import DiscoveryScreen from "./src/screens/DiscoveryScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ReportScreen from "./src/screens/ReportScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MapScreen from "./src/screens/MapScreen";

// Oux Screen
import CreatePostScreen from "./src/screens/CreatePostScreen";
import MessagesScreen from "./src/screens/MessagesScreen";
import UserMessageScreen from "./src/screens/UserMessageScreen";
import MessageInfo from "./src/screens/MessageInfo";
import UserProfile from "./src/components/UserProfile";
import StoryViewer from "./src/screens/StoryViewer";
import StoryViewerPage from "./src/screens/StoryViewerPage";

// Icons
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { TouchableOpacity } from "react-native";

// Stack ve Tab navigatörleri
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // Varsayılan değeri değiştirme
  TouchableOpacity.defaultProps = {
    ...(TouchableOpacity.defaultProps || {}),
    activeOpacity: 1,
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{ title: "Create Post", headerShown: false }}
          />
          <Stack.Screen
            name="Messages"
            component={MessagesScreen}
            options={{ title: "Messages", headerShown: false }}
          />
          <Stack.Screen
            name="UserMessage"
            component={UserMessageScreen}
            options={{ title: "Messages", headerShown: false }}
          />
          <Stack.Screen
            name="MessageInfo"
            component={MessageInfo}
            options={{ title: "MessageInfo", headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ title: "UserProfile", headerShown: false }}
          />
          <Stack.Screen
            name="StoryViewer"
            component={StoryViewer}
            options={{ title: "StoryViewer", headerShown: false }}
          />
          <Stack.Screen
            name="StoryViewerPage"
            component={StoryViewerPage}
            options={{ title: "StoryViewerPage", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "black",
        paddingBottom: 10,
        paddingTop: 10,
        borderTopWidth: 0,
      },
      tabBarLabelStyle: {
        color: "white",
      },
      tabBarActiveTintColor: "white",
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <AntDesign name="home" size={focused ? 23 : 20} color={color} />
        ),
        tabBarShowLabel: false,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Discovery"
      component={DiscoveryScreen}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <AntDesign name="search1" size={focused ? 23 : 20} color={color} />
        ),
        tabBarShowLabel: false,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name="share-location"
            size={focused ? 30 : 28}
            color={color}
          />
        ),
        tabBarShowLabel: false,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Report"
      component={ReportScreen}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <AntDesign name="hearto" size={focused ? 23 : 20} color={color} />
        ),
        tabBarShowLabel: false,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <AntDesign name="user" size={focused ? 23 : 20} color={color} />
        ),
        tabBarShowLabel: false,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);
