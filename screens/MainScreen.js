import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import instance from "../axios";

import { sendWatchedData } from "../store/watched/watched-actions";
import { sendFavoritesData } from "../store/favorites/favorites-actions";
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
          <Text>There is no content.</Text>
        </LinearGradient>
      </View>
    );
  }

  const renderMovieItem = ({ item }) => {
    return <MovieItem item={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FD841F", "#FECD70"]} style={styles.gradient}>
        <FlatList
          data={data}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          initialNumToRender={20}
        />
        <View style={styles.buttons}>
          <ScrollView horizontal={true}>
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
            <Pressable style={styles.button} onPress={() => setPage("6")}>
              <Text style={styles.number}>6</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("7")}>
              <Text style={styles.number}>7</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("8")}>
              <Text style={styles.number}>8</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("9")}>
              <Text style={styles.number}>9</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("10")}>
              <Text style={styles.number}>10</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("11")}>
              <Text style={styles.number}>11</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("12")}>
              <Text style={styles.number}>12</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("13")}>
              <Text style={styles.number}>13</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("14")}>
              <Text style={styles.number}>14</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("15")}>
              <Text style={styles.number}>15</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("16")}>
              <Text style={styles.number}>16</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("17")}>
              <Text style={styles.number}>17</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setPage("18")}>
              <Text style={styles.number}>18</Text>
            </Pressable>
          </ScrollView>
        </View>
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
    paddingVertical: Dimensions.get("window").height > 1920 ? 20 : 15,
  },
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 0,
    width: "90%",
  },
  button: {
    backgroundColor: Colors.accentColor,
    padding: 8,
    borderRadius: 5,
    marginRight: 7,
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
