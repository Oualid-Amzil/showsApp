import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { authActions } from "../store/auth/auth";
import { uiActions } from "../store/ui";

const FirstScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("home");
        return;
      }
      const transformeData = JSON.parse(userData);

      const { token, userId, expiryDate } = transformeData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("home");
        return;
      }

      // const { token, userId } = transformeData;

      // if (!token || !userId) {
      //   props.navigation.navigate("home");
      //   return;
      // }

      dispatch(
        authActions.authentication({ token, userId, isAuthenticated: true })
      );
      props.navigation.navigate("home");
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={["#FD841F", "#FECD70"]} style={styles.gradient}>
        <ActivityIndicator size="large" color="blue" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FirstScreen;
