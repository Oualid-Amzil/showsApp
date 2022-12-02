import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";

import Input from "../../component/UI/Input";
import Card from "../../component/UI/Card";
import { signUp, signIn } from "../../store/auth/auth-actions";
import { authActions } from "../../store/auth/auth";

import Colors from "../../constant/Colors";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.isvalid]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  } else if (action.type === "FORM_INPUT_RESET") {
    return {
      ...state,
      inputValues: {},
    };
  }
  return state;
};

const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const errorMessage = useSelector((state) => state.ui.message);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (errorMessage) {
      Alert.alert("An Error Occurred!", errorMessage, [{ text: "Okey" }]);
    }
  }, [errorMessage]);

  const signupHandler = () => {
    dispatch(
      signUp(
        formState.inputValues.email,
        formState.inputValues.password,
        navigation
      )
    );
  };

  const loginHandler = () => {
    dispatch(
      signIn(
        formState.inputValues.email,
        formState.inputValues.password,
        navigation
      )
    );
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: "FORM_INPUT_UPDATE",
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <LinearGradient colors={["#E14D2A", "#FECD70"]} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autocapitalize="none"
            errorMessage="Please enter a valid email address"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autocapitalize="none"
            errorMessage="Please enter a valid password"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color="blue" />
            ) : (
              <Button
                title={isSignup ? "Sign Up" : "Login"}
                color={Colors.accentColor}
                onPress={isSignup ? signupHandler : loginHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch To ${isSignup ? "Login" : "Sign Up"}`}
              color={Colors.accentColor}
              onPress={() => setIsSignup(!isSignup)}
            />
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
