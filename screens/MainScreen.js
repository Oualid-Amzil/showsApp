import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";

import instance from "../axios";

import { getWatchedData, sendWatchedData } from "../store/watched-actions";
import {
  getFavoritesData,
  sendFavoritesData,
} from "../store/favorites-actions";
import { uiActions } from "../store/ui";
import MovieItem from "../component/MovieItem";
import Colors from "../constant/Colors";

let isInitial = true;

const MainScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.message);
  const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const URL = route.params.url;
  const watched = useSelector((state) => state.watched);
  const favorites = useSelector((state) => state.favorites);

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

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(uiActions.isLoading(true));
      dispatch(uiActions.error(null));

      try {
        const response = await instance.get(
          `${!page ? URL : `${URL}&page=${page}`}`
        );

        setData(response.data.results);
        dispatch(uiActions.isLoading(false));
      } catch (error) {
        dispatch(uiActions.error(error.message));
        dispatch(uiActions.isLoading(false));
      }
    };

    fetchMovies();
  }, [page]);

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
    return <MovieItem item={item} navigation={navigation} />;
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
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={() => setPage("1")}>
          <Text style={styles.number}>1</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setPage("2")}>
          <Text style={styles.number}>2</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setPage("3")}>
          <Text style={styles.number}>3</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setPage("4")}>
          <Text style={styles.number}>4</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setPage("5")}>
          <Text style={styles.number}>5</Text>
        </Pressable>
      </View>
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
  buttons: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 0,
  },
  button: {
    backgroundColor: Colors.accentColor,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  number: {
    fontSize: 18,
    color: "black",
  },
  error: {
    color: "red",
    fontFamily: "lato-bold",
    fontSize: 20,
  },
});

export default MainScreen;
