import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../component/CustomHeaderButton";
import PersonalScreen from "../screens/PersonalScreen";
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

const PersonalMoviesScreen = () => {
  return <PersonalScreen name="watchedMovie" />;
};

const PersonalTvScreen = () => {
  return <PersonalScreen name="watchedTv" />;
};

const MovieStack = createNativeStackNavigator();

const MoviesNavigator = () => {
  return (
    <MovieStack.Navigator screenOptions={defaultStyling}>
      <MovieStack.Screen
        name="movies"
        component={PersonalMoviesScreen}
        options={({ navigation }) => ({
          title: "watched movies",
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
        name="series"
        component={PersonalTvScreen}
        options={({ navigation }) => ({
          title: "watched series",
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

const WatchedNavigator = () => {
  return (
    <Tab.Navigator
      activeColor="black"
      shifting={true}
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: { display: "none" },
      }}
    >
      <Tab.Screen
        name="moviesTab"
        component={MoviesNavigator}
        options={{
          tabBarLabel: "MOVIES",
          // tabBarIcon: ({ color }) => (
          //   <Ionicons name="md-film" size={20} color={color} />
          // ),

          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: Colors.accentColor,
          tabBarActiveBackgroundColor: Colors.accentColor,
          tabBarInactiveBackgroundColor: Colors.primaryColor,
          tabBarLabelStyle: {
            fontFamily: "ptserif-bold",
            fontSize: 18,
            marginBottom: 10,
          },
        }}
      />
      <Tab.Screen
        name="seriesTab"
        component={TvNavigator}
        options={{
          tabBarLabel: "SERIES",
          // tabBarIcon: ({ color }) => (
          //   <Ionicons name="md-tv-outline" size={20} color={color} />
          // ),
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: Colors.accentColor,
          tabBarActiveBackgroundColor: Colors.accentColor,
          tabBarInactiveBackgroundColor: Colors.primaryColor,
          tabBarLabelStyle: {
            fontFamily: "ptserif-bold",
            fontSize: 18,
            marginBottom: 10,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default WatchedNavigator;
