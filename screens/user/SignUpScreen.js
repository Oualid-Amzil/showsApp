import React, { useState, useReducer, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button } from "react-native-paper";
import { isEmpty, isEmail } from "validator";
import Ionicons from "react-native-vector-icons/Ionicons";

import { LinearGradient } from "expo-linear-gradient";

import Card from "../../component/UI/Card";
import { signUp } from "../../store/auth/auth-actions";

import Colors from "../../constant/Colors";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        value: action.value,
        valid: action.valid,
      };

    case "INPUT_BLUR":
      return {
        ...state,
        touched: action.value,
      };

    default:
      return state;
  }
};

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const errorMessage = useSelector((state) => state.ui.message);
  const [emailState, emailDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });
  const [passwordState, passwordDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });
  const [cmPasswordState, cmPasswordDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const emailChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || !isEmail(text)) {
      isValid = false;
    }
    emailDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  const passwordChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || text.length < 5) {
      isValid = false;
    }
    passwordDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  const cmPasswordChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || text.length < 5 || text !== passwordState.value) {
      isValid = false;
    }
    cmPasswordDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert("An Error Occurred!", errorMessage, [{ text: "Okey" }]);
    }
  }, [errorMessage]);

  const loginHandler = () => {
    if (emailState.valid && passwordState.valid && cmPasswordState.valid) {
      dispatch(signUp(emailState.value, passwordState.value, navigation));
      emailDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
      emailDispatch({ type: "INPUT_BLUR", touched: false });
      passwordDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
      passwordDispatch({ type: "INPUT_BLUR", touched: false });
      cmPasswordDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
      cmPasswordDispatch({ type: "INPUT_BLUR", touched: false });
    } else {
      Alert.alert("An Error Occurred!", "Please check your inputs.", [
        { text: "Okay" },
      ]);
    }
  };

  const emailError = !emailState.valid && emailState.touched;
  const passwordError = !passwordState.valid && passwordState.touched;
  const cmPasswordError = !cmPasswordState.valid && cmPasswordState.touched;

  return (
    <LinearGradient colors={["#FECD70", "#FD841F"]} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <TextInput
            label="E-Mail"
            mode="outlined"
            style={
              !emailError
                ? styles.input
                : { ...styles.input, backgroundColor: "#FFE3E1" }
            }
            onChangeText={(text) => emailChangeHandler(text)}
            onBlur={() => emailDispatch({ type: "INPUT_BLUR", value: true })}
            value={emailState.value}
          />
          {emailError && (
            <Text style={styles.error}>Please provide a valid email.</Text>
          )}
          <TextInput
            label="Password"
            mode="outlined"
            style={
              !passwordError
                ? styles.input
                : { ...styles.input, backgroundColor: "#FFE3E1" }
            }
            onChangeText={(text) => passwordChangeHandler(text)}
            onBlur={() => passwordDispatch({ type: "INPUT_BLUR", value: true })}
            value={passwordState.value}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye" : "eye-off"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          {passwordError && (
            <Text style={styles.error}>Please provide a valid pasword.</Text>
          )}
          <TextInput
            label="Confirm Password"
            mode="outlined"
            style={
              !cmPasswordError
                ? styles.input
                : { ...styles.input, backgroundColor: "#FFE3E1" }
            }
            onChangeText={(text) => cmPasswordChangeHandler(text)}
            onBlur={() =>
              cmPasswordDispatch({ type: "INPUT_BLUR", value: true })
            }
            value={cmPasswordState.value}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye" : "eye-off"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          {cmPasswordError && (
            <Text style={styles.error}>Please provide a valid pasword.</Text>
          )}
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color="blue" />
            ) : (
              <Pressable style={styles.button} onPress={loginHandler}>
                <Ionicons
                  name={
                    Platform.OS === "android"
                      ? "md-person-add"
                      : "ios-person-add"
                  }
                  size={20}
                  color="black"
                />
                <Text style={{ fontSize: 19, marginLeft: 5 }}>Sign Up</Text>
              </Pressable>
            )}
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
  input: {
    fontFamily: "ptserif-bold",
    marginVertical: 8,
  },
  error: {
    fontFamily: "abissinicaSIL-regular",
    color: "red",
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 19,
    backgroundColor: Colors.primaryColor,
  },
});

export default SignUpScreen;
