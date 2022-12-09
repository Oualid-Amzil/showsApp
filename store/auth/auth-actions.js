import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { uiActions } from "../ui";
import { authActions } from "./auth";

import { PROJECT_KEY } from "../../apiKeys";

let timer;

export const signUp = (email, password, navigation) => {
  return async (dispatch) => {
    dispatch(uiActions.error(null));
    dispatch(uiActions.isLoading(true));
    try {
      const response = await axios({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${PROJECT_KEY}`,
        data: {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      });

      dispatch(
        authActions.authentication({
          token: response.data.idToken,
          userId: response.data.localId,
          isAuthenticated: true,
        })
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000
      );

      timer = setTimeout(async () => {
        await removeDataFromStorage();
        dispatch(authActions.logout());
      }, expirationDate);

      await saveDataToStorage(
        response.data.idToken,
        response.data.localId,
        expirationDate
      );

      dispatch(uiActions.isLoading(false));
      navigation.navigate("discover");
    } catch (error) {
      const errorId = error.response.data.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "The email address is already in use by another account.!";
      }
      dispatch(uiActions.error(message));
      dispatch(uiActions.isLoading(false));
    }
  };
};

export const signIn = (email, password, navigation) => {
  return async (dispatch) => {
    dispatch(uiActions.error(null));
    dispatch(uiActions.isLoading(true));
    try {
      const response = await axios({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${PROJECT_KEY}`,
        data: {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      });

      dispatch(
        authActions.authentication({
          token: response.data.idToken,
          userId: response.data.localId,
          isAuthenticated: true,
        })
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000
      );

      timer = setTimeout(async () => {
        await removeDataFromStorage();
        dispatch(authActions.logout());
      }, expirationDate);

      await saveDataToStorage(
        response.data.idToken,
        response.data.localId,
        expirationDate
      );

      dispatch(uiActions.isLoading(false));
      navigation.navigate("home");
    } catch (error) {
      const errorId = error.response.data.error.message || null;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      dispatch(uiActions.error(message));
      dispatch(uiActions.isLoading(false));
    }
  };
};

export const Logout = () => {
  return async (dispatch) => {
    clearTimeout(timer);

    await removeDataFromStorage();
    dispatch(authActions.logout());
  };
};

const saveDataToStorage = async (token, userId, expirationDate) => {
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString(),
      })
    );
  } catch (error) {
    dispatch(uiActions.error("Something went wrong"));
    dispatch(uiActions.isLoading(false));
  }
};

const removeDataFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("userData");
  } catch (error) {
    dispatch(uiActions.error("Something went wrong"));
    dispatch(uiActions.isLoading(false));
  }
};
