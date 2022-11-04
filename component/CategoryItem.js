import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constant/Colors";

const CategoryItem = ({ navigation, request, label }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp
      onPress={() =>
        navigation.navigate(`${label === "movies" ? "movies" : "series"}`, {
          url: request.url,
          name: request.name,
        })
      }
    >
      <View style={styles.wrapper}>
        <Text style={styles.name}>{request.name}</Text>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
    height: 150,
    margin: 10,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: Colors.accentColor,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "white",
    overflow: "hidden",
  },
  name: {
    fontFamily: "ptserif-bold",
    fontSize: 20,
  },
});

export default CategoryItem;
