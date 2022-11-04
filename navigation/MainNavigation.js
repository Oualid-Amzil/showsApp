import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { Ionicons } from "react-native-vector-icons";

import DiscoverNavigator from "./DiscoverNavigator";
import WatchedNavigator from "./WatchedNavigator";
import FavoritesNavigator from "./FavoritesNavigator";

import Colors from "../constant/Colors";

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#FC4F4F",
            width: 250,
          },
        }}
      >
        <Drawer.Screen
          name="Discover"
          component={DiscoverNavigator}
          options={{
            drawerActiveBackgroundColor: Colors.primaryColor,
            drawerActiveTintColor: Colors.accentColor,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={size}
                color={focused ? Colors.accentColor : Colors.primaryColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Watched"
          component={WatchedNavigator}
          options={{
            drawerActiveBackgroundColor: Colors.primaryColor,
            drawerActiveTintColor: Colors.accentColor,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-eye" : "ios-eye"}
                size={size}
                color={focused ? Colors.accentColor : Colors.primaryColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesNavigator}
          options={{
            drawerActiveBackgroundColor: Colors.primaryColor,
            drawerActiveTintColor: Colors.accentColor,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-heart" : "ios-heart"}
                size={size}
                color={focused ? Colors.accentColor : Colors.primaryColor}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
