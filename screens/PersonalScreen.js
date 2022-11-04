import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import MovieItem from "../component/MovieItem";
import Colors from "../constant/Colors";

const PersonalScreen = ({ navigation, data }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.message);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text style={styles.error}>{error.message}</Text>
      </View>
    );
  }

  const renderMovieItem = ({ item }) => {
    return (
      <MovieItem length={data.length} item={item} navigation={navigation} />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        initialNumToRender={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    paddingVertical: 20,
  },
  error: {
    color: "red",
    fontFamily: "lato-bold",
    fontSize: 20,
  },
});

export default PersonalScreen;
