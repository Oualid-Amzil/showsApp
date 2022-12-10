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

import Colors from "../constant/Colors";

const CategoryItem = ({ navigation, name, label, pressHandle }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={() => pressHandle()}>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 6,
    backgroundColor: Colors.primaryColor,
    overflow: "hidden",
  },

  name: {
    fontFamily: "ptserif-bold",
    fontSize: Dimensions.get("window").height > 1920 ? 19 : 17,
  },
});

export default CategoryItem;
