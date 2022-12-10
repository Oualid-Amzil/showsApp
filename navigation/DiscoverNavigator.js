import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "react-native-vector-icons";

import CustomHeaderButton from "../component/CustomHeaderButton";
import MoviesScreen from "../screens/MoviesScreen";
import TvScreen from "../screens/TvScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import TvDetailsScreen from "../screens/TvDetailsScreen";

import Colors from "../constant/Colors";

const defaultStyling = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "ptserif-bold",
    fontSize: 20,
  },
};

const MovieStack = createNativeStackNavigator();

const MoviesNavigator = () => {
  return (
    <MovieStack.Navigator screenOptions={defaultStyling}>
      <MovieStack.Screen
        name="Movie"
        component={MoviesScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <MovieStack.Screen name="details" component={MovieDetailsScreen} />
    </MovieStack.Navigator>
  );
};

const TvStack = createNativeStackNavigator();

const TvNavigator = () => {
  return (
    <TvStack.Navigator screenOptions={defaultStyling}>
      <TvStack.Screen
        name="Tv"
        component={TvScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <TvStack.Screen name="details" component={TvDetailsScreen} />
    </TvStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const DiscoverNavigator = () => {
  return (
    <Tab.Navigator
      activeColor="black"
      shifting={true}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="moviesTab"
        component={MoviesNavigator}
        options={{
          tabBarLabel: "MOVIES",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-film" size={20} color={color} />
          ),
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: Colors.accentColor,
          tabBarActiveBackgroundColor: Colors.accentColor,
          tabBarInactiveBackgroundColor: Colors.primaryColor,
          tabBarLabelStyle: {
            fontFamily: "ptserif-bold",
            fontSize: 18,
          },
        }}
      />
      <Tab.Screen
        name="tvTab"
        component={TvNavigator}
        options={{
          tabBarLabel: "TV",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-tv-outline" size={20} color={color} />
          ),
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: Colors.accentColor,
          tabBarActiveBackgroundColor: Colors.accentColor,
          tabBarInactiveBackgroundColor: Colors.primaryColor,
          tabBarLabelStyle: {
            fontFamily: "ptserif-bold",
            fontSize: 18,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DiscoverNavigator;
