import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "react-native-vector-icons";

import CustomHeaderButton from "../component/CustomHeaderButton";
import MainScreen from "../screens/MainScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import TvDetailsScreen from "../screens/TvDetailsScreen";
import MoviesCategoryScreen from "../screens/MoviesCategoryScreen";
import SeriesCategoryScreen from "../screens/SeriesCategoryScreen";

import Colors from "../constant/Colors";

const defaultStyling = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
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
        name="MovieCategories"
        component={MoviesCategoryScreen}
        options={({ navigation }) => ({
          title: "Movie Categories",
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
      <MovieStack.Screen
        name="movies"
        component={MainScreen}
        options={({ route }) => ({
          title: route.params.name,
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
        name="TvCategories"
        component={SeriesCategoryScreen}
        options={({ navigation }) => ({
          title: "Tv Categories",
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
      <TvStack.Screen
        name="series"
        component={MainScreen}
        options={({ route }) => ({
          title: route.params.name,
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
        name="seriesTab"
        component={TvNavigator}
        options={{
          tabBarLabel: "SERIES",
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
