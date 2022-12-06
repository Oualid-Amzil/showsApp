import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constant/Colors";

const CategoryItem = ({ navigation, request, label }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp
      onPress={() =>
        navigation.navigate(`${label === "movies" ? "movies" : "tv"}`, {
          url: request.url,
          name: request.name,
        })
      }
    >
      <View style={styles.wrapper}>
        <LinearGradient
          colors={["#FECD70", "#FD841F"]}
          locations={[0.4, 0.8]}
          style={styles.gradient}
        >
          <Text style={styles.name}>{request.name}</Text>
        </LinearGradient>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "50%",
    height: Dimensions.get("window").height / 4.5,
  },
  gradient: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.accentColor,
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
  name: {
    fontFamily: "ptserif-bold",
    fontSize: Dimensions.get("window").height > 1920 ? 22 : 20,
  },
});

export default CategoryItem;
