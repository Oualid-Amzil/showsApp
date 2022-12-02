import "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Platform } from "react-native";
import { Ionicons } from "react-native-vector-icons";

import DiscoverNavigator from "./DiscoverNavigator";
import WatchedNavigator from "./WatchedNavigator";
import FavoritesNavigator from "./FavoritesNavigator";
import { SignUpNavigator, LogInNavigator } from "./AuthNavigation";
import FirstScreen from "../screens/FirstScreen";

import { Logout } from "../store/auth/auth-actions";

import Colors from "../constant/Colors";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {isAuthenticated && (
              <DrawerItem
                label="Lougout"
                inactiveBackgroundColor={Colors.accentColor}
                inactiveTintColor="black"
                icon={({ color, size }) => (
                  <Ionicons
                    color={color}
                    size={size}
                    name={
                      Platform.OS === "android" ? "md-log-out" : "ios-log-out"
                    }
                  />
                )}
                onPress={() => {
                  dispatch(Logout());
                  props.navigation.navigate("home");
                }}
              />
            )}
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#FC4F4F",
          width: 250,
          paddingTop: 30,
        },
      }}
    >
      <Drawer.Screen
        name="discover"
        component={DiscoverNavigator}
        options={{
          headerTitle: "Discover",
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
      {isAuthenticated ? (
        <>
          <Drawer.Screen
            name="watched"
            component={WatchedNavigator}
            options={{
              headerTitle: "Watched List",
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
            name="favorites"
            component={FavoritesNavigator}
            options={{
              headerTitle: "Favorites List",
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
        </>
      ) : (
        <>
          <Drawer.Screen
            name="signin"
            component={LogInNavigator}
            options={{
              headerTitle: "SignIn",
              drawerActiveBackgroundColor: Colors.primaryColor,
              drawerActiveTintColor: Colors.accentColor,
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={Platform.OS === "android" ? "md-log-in" : "ios-log-in"}
                  size={size}
                  color={focused ? Colors.accentColor : Colors.primaryColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="signup"
            component={SignUpNavigator}
            options={{
              headerTitle: "SignUp",
              drawerActiveBackgroundColor: Colors.primaryColor,
              drawerActiveTintColor: Colors.accentColor,
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={
                    Platform.OS === "android"
                      ? "md-person-add"
                      : "ios-person-add"
                  }
                  size={size}
                  color={focused ? Colors.accentColor : Colors.primaryColor}
                />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="startup" component={FirstScreen} />
        <MainStack.Screen name="home" component={DrawerNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
