import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../component/CustomHeaderButton";
import PersonalScreen from "../screens/PersonalScreen";

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
  return <PersonalScreen name="favoriteMovie" />;
};

const PersonalTvScreen = () => {
  return <PersonalScreen name="favoriteTv" />;
};

const MovieStack = createNativeStackNavigator();

const MoviesNavigator = () => {
  return (
    <MovieStack.Navigator screenOptions={defaultStyling}>
      <MovieStack.Screen
        name="movies"
        component={PersonalMoviesScreen}
        options={({ navigation }) => ({
          title: "favorite movies",
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
          title: "favorite series",
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
    </TvStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const FavoritesNavigator = () => {
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

export default FavoritesNavigator;
