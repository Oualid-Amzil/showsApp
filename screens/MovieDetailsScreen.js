import { processFontFamily } from "expo-font";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "react-native-vector-icons";

import { sendFavoritesData } from "../store/favorites-actions";
import { sendWatchedData } from "../store/watched-actions";
import { watchedActions } from "../store/watched";
import { favoritesActions } from "../store/favorites";
import Colors from "../constant/Colors";

const baseURL = "https://image.tmdb.org/t/p/original";

const MovieDetailsScreen = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.item.item);
  const watchedMovies = useSelector((state) => state.watched.movies);
  const favoritesMovies = useSelector((state) => state.favorites.movies);

  const [isWatched, setIsWatched] = useState(
    watchedMovies.find((item) => item.id === movie.id) ? true : false
  );
  const [isLoved, setIsLoved] = useState(
    favoritesMovies.find((item) => item.id === movie.id) ? true : false
  );

  const movieWatchedHandler = () => {
    if (isWatched) {
      dispatch(watchedActions.removeMovie(movie.id));
    } else {
      dispatch(watchedActions.addMovie(movie));
    }
    setIsWatched(!isWatched);
  };

  const movieLovedHandler = () => {
    if (isLoved) {
      dispatch(favoritesActions.removeMovie(movie.id));
    } else {
      dispatch(favoritesActions.addMovie(movie));
    }
    setIsLoved(!isLoved);
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: `${baseURL}${movie.backdrop_path}` }}
            style={styles.image}
          />
          <Pressable
            style={{
              ...styles.eye,
            }}
            onPress={movieWatchedHandler}
          >
            <Ionicons
              name={isWatched ? "md-eye" : "md-eye-outline"}
              size={35}
              color={isWatched ? Colors.primaryColor : "black"}
            />
          </Pressable>
          <Pressable
            style={{
              ...styles.heart,
            }}
            onPress={movieLovedHandler}
          >
            <Ionicons
              name={isLoved ? "md-heart" : "md-heart-outline"}
              size={35}
              color={isLoved ? "red" : "black"}
            />
          </Pressable>
        </View>
        <Text style={styles.title}>
          {movie?.title || movie?.name || movie?.original_name}
        </Text>
        <Text style={styles.label}>
          Release date:{" "}
          <Text style={styles.child}>
            {" "}
            {movie?.release_date || movie?.first_air_date}
          </Text>
        </Text>
        <View style={styles.content}>
          <Text style={styles.label}>
            language:{" "}
            <Text style={styles.child}>{movie?.original_language}</Text>
          </Text>
          <Text style={styles.label}>
            rate:{" "}
            <Text style={styles.child}>
              {movie?.vote_average.toFixed(1)}
              <Ionicons name="md-star" size={18} />
            </Text>
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.paragraph}>{movie?.overview}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  imageWrapper: {
    width: "100%",
    height: 300,
    objectFit: "cover",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
    objectFit: "cover",
  },
  title: {
    fontFamily: "ptserif-bold",
    fontSize: 23,
    color: "black",
    textAlign: "center",
    marginVertical: 10,
    color: "red",
  },
  label: {
    fontFamily: "ptserif-bold",
    fontSize: 20,
    color: "red",
    paddingHorizontal: 10,
  },
  child: {
    fontSize: 19,
    color: "black",
  },
  content: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  paragraph: {
    fontSize: 20,
    fontFamily: "abissinicaSIL-regular",
    lineHeight: 28,
    paddingHorizontal: 25,
    paddingVertical: 10,
    color: "black",
    textAlign: "justify",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  eye: {
    position: "absolute",
    top: 50,
    right: 8,
    zIndex: 10,
  },
  heart: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
});

export default MovieDetailsScreen;
