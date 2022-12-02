import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "react-native-vector-icons";
import instance from "../axios";
import { LinearGradient } from "expo-linear-gradient";

import { uiActions } from "../store/ui";
import { watchedActions } from "../store/watched/watched";
import { favoritesActions } from "../store/favorites/favorites";
import Colors from "../constant/Colors";

const baseURL = "https://image.tmdb.org/t/p/original";

const TvDetailsScreen = () => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.item.item);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.message);
  const [data, setData] = useState();
  const watchedSeries = useSelector((state) => state.watched.series);
  const favoritesSeries = useSelector((state) => state.favorites.series);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isWatched, setIsWatched] = useState(
    watchedSeries.find((item) => item.id === show.id) ? true : false
  );
  const [isLoved, setIsLoved] = useState(
    favoritesSeries.find((item) => item.id === show.id) ? true : false
  );

  const tvWatchedHandler = () => {
    if (isWatched) {
      dispatch(watchedActions.removeSerie(show.id));
    } else {
      dispatch(watchedActions.addSerie(show));
    }
    setIsWatched(!isWatched);
  };

  const tvLovedHandler = () => {
    if (isLoved) {
      dispatch(favoritesActions.removeSerie(show.id));
    } else {
      dispatch(favoritesActions.addSerie(show));
    }
    setIsLoved(!isLoved);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(uiActions.isLoading(true));
      dispatch(uiActions.error(null));

      try {
        const response = await instance.get(
          `/tv/${show.id}?api_key=f85e3b31e546a3339733a14746d23b6a&language=en-US`
        );

        const data = response.data;

        setData(data);
        dispatch(uiActions.isLoading(false));
      } catch (error) {
        dispatch(uiActions.error(error.message));
        dispatch(uiActions.isLoading(false));
      }
    };

    fetchMovies();
  }, [dispatch]);

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
          <Text style={styles.error}>{error}</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: `${baseURL}${data?.backdrop_path}` }}
            style={styles.image}
          />
          {isAuthenticated && (
            <>
              <Pressable
                style={{
                  ...styles.eye,
                }}
                onPress={tvWatchedHandler}
              >
                <Ionicons
                  name={isWatched ? "md-eye" : "md-eye-off"}
                  size={30}
                  color="black"
                  // color={isWatched ? Colors.primaryColor : "black"}
                />
              </Pressable>
              <Pressable
                style={{
                  ...styles.heart,
                }}
                onPress={tvLovedHandler}
              >
                <Ionicons
                  name={isLoved ? "md-heart" : "md-heart-outline"}
                  size={30}
                  color={isLoved ? "red" : "black"}
                />
              </Pressable>
            </>
          )}
        </View>
        <Text style={styles.title}>
          {data?.title || data?.name || data?.original_name}
        </Text>
        <Text style={styles.label}>
          Created By:{" "}
          <Text style={styles.child}>
            {" "}
            {data?.created_by[0]?.name || "unknown"}
          </Text>
        </Text>
        <Text style={styles.label}>
          Release date:{" "}
          <Text style={styles.child}>
            {" "}
            {data?.release_date || data?.first_air_date}
          </Text>
        </Text>

        <View style={styles.content}>
          <Text style={styles.label}>
            language:{" "}
            <Text style={styles.child}>{data?.original_language}</Text>
          </Text>
          <Text style={styles.label}>
            rate:{" "}
            <Text style={styles.child}>
              {data?.vote_average.toFixed(1)}
              <Ionicons name="md-star" size={18} />
            </Text>
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>
            Seasons: <Text style={styles.child}>{data?.number_of_seasons}</Text>
          </Text>
          <Text style={styles.label}>
            Episodes:{" "}
            <Text style={styles.child}>{data?.number_of_episodes}</Text>
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.paragraph}>{data?.overview}</Text>
        </View>
      </ScrollView>
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
    opacity: 0.7,
    objectFit: "cover",
  },
  title: {
    fontFamily: "ptserif-bold",
    fontSize: 23,
    color: "black",
    textAlign: "center",
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 20,
    color: "red",
  },
  label: {
    fontFamily: "ptserif-bold",
    fontSize: 20,
    color: "red",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  child: {
    fontSize: 19,
    color: "black",
  },
  content: {
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
  error: {
    color: "red",
    fontFamily: "lato-bold",
    fontSize: 20,
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

export default TvDetailsScreen;
