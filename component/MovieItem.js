import React from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";

import { itemActions } from "../store/item";

import Colors from "../constant/Colors";

const baseURL = "https://image.tmdb.org/t/p/original";

const MovieItem = ({ item, navigation, length }) => {
  const dispatch = useDispatch();

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const onPressHandler = () => {
    dispatch(itemActions.storeItem(item));
    navigation.navigate("details");
  };

  return (
    <TouchableCmp onPress={onPressHandler}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: `${baseURL}${item.poster_path}` }}
          style={styles.image}
        />
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: "43%",
    height: Dimensions.get("window").height / 2.5,
    borderRadius: 20,
    objectFit: "contain",
    overflow: "hidden",
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 10,
    borderBottomColor: "black",
    borderBottomWidth: 4,
    paddingBottom: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default MovieItem;
