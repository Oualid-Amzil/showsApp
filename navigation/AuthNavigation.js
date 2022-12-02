import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../component/CustomHeaderButton";
import LogInScreen from "../screens/user/LogInScreen";
import SignUpScreen from "../screens/user/SignUpScreen";
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

const AuthStack = createNativeStackNavigator();

export const LogInNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={defaultStyling}>
      <AuthStack.Screen
        name="loginpage"
        component={LogInScreen}
        options={({ navigation }) => ({
          title: "LogIn",
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
    </AuthStack.Navigator>
  );
};

export const SignUpNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={defaultStyling}>
      <AuthStack.Screen
        name="signuppage"
        component={SignUpScreen}
        options={({ navigation }) => ({
          title: "SignUp",
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
    </AuthStack.Navigator>
  );
};
