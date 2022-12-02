import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { sendWatchedData } from "../store/watched/watched-actions";
import { sendFavoritesData } from "../store/favorites/favorites-actions";

import ListItem from "../component/ListItem";
import Colors from "../constant/Colors";

let isInitial = true;
let data;
let message;

const PersonalScreen = ({ name }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.message);
  const watched = useSelector((state) => state.watched);
  const favorites = useSelector((state) => state.favorites);

  if (name === "favoriteMovie") {
    data = favorites.movies;
    message = "You did not love any movie.";
  } else if (name === "favoriteTv") {
    data = favorites.series;
    message = "You did not love any serie.";
  } else if (name === "watchedMovie") {
    data = watched.movies;
    message = "You did not watch any movie.";
  } else if (name === "watchedTv") {
    data = watched.series;
    message = "You did not watch any serie.";
  }

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (watched.changed) {
      dispatch(sendWatchedData(watched));
    }
    if (favorites.changed) {
      dispatch(sendFavoritesData(favorites));
    }
  }, [watched, favorites, dispatch]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <LinearGradient colors={["#FD841F", "#FECD70"]} style={styles.gradient}>
          <ActivityIndicator size="large" color="blue" />
        </LinearGradient>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <LinearGradient colors={["#FD841F", "#FECD70"]} style={styles.gradient}>
          <Text style={styles.error}>{error.message}</Text>
        </LinearGradient>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.screen}>
        <LinearGradient colors={["#FD841F", "#FECD70"]} style={styles.gradient}>
          <Text style={styles.text}>{message}</Text>
        </LinearGradient>
      </View>
    );
  }

  const renderListItem = ({ item }) => {
    return <ListItem item={item} name={name} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={20}
      />
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: Colors.primaryColor,
  },
  error: {
    color: "red",
    fontFamily: "lato-bold",
    fontSize: 20,
  },
  text: {
    fontFamily: "ptserif-bold",
    fontSize: 20,
  },
});

export default PersonalScreen;
