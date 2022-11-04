import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "react-native-vector-icons";

import CustomHeaderButton from "../component/CustomHeaderButton";
import PersonalScreen from "../screens/PersonalScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import TvDetailsScreen from "../screens/TvDetailsScreen";

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

const PersonalMoviesScreen = ({ navigation }) => {
  const movies = useSelector((state) => state.watched.movies);

  return <PersonalScreen data={movies} navigation={navigation} />;
};

const PersonalTvScreen = ({ navigation }) => {
  const series = useSelector((state) => state.watched.series);

  return <PersonalScreen data={series} navigation={navigation} />;
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
