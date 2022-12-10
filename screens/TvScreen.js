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
import CategoryItem from "../component/CategoryItem";
import MovieItem from "../component/MovieItem";

import { TvRequests, Pages } from "../requests";

import Colors from "../constant/Colors";

let isInitial = true;

const TvScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.message);
  const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const [URL, setUrl] = useState(TvRequests[0].url);
  const [label, setLabel] = useState(TvRequests[0].name);

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
    navigation.setOptions({
      title: label,
    });
  }, [page, URL]);

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
          <View style={styles.categories}>
            <ScrollView horizontal={true}>
              {TvRequests.map((item) => (
                <CategoryItem
                  name={item.name}
                  key={item.id}
                  navigation={navigation}
                  pressHandle={() => {
                    setUrl(item.url);
                    setLabel(item.name);
                  }}
                  label="movies"
                />
              ))}
            </ScrollView>
          </View>
          <Text style={styles.error}>{error.message}</Text>
        </LinearGradient>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.screen}>
        <LinearGradient colors={["#FD841F", "#FECD70"]} style={styles.gradient}>
          <View style={styles.categories}>
            <ScrollView horizontal={true}>
              {TvRequests.map((item) => (
                <CategoryItem
                  name={item.name}
                  key={item.id}
                  navigation={navigation}
                  pressHandle={() => {
                    setUrl(item.url);
                    setLabel(item.name);
                  }}
                  label="movies"
                />
              ))}
            </ScrollView>
          </View>
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
        <View style={styles.categories}>
          <ScrollView horizontal={true}>
            {TvRequests.map((item) => (
              <CategoryItem
                name={item.name}
                key={item.id}
                navigation={navigation}
                pressHandle={() => {
                  setUrl(item.url);
                  setLabel(item.name);
                }}
                label="movies"
              />
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={data}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          initialNumToRender={20}
        />
        <View style={styles.buttons}>
          <ScrollView horizontal={true}>
            {Pages.map((page) => (
              <Pressable
                style={styles.button}
                key={page.id}
                onPress={() => setPage(page.number)}
              >
                <Text style={styles.number}>{page.number}</Text>
              </Pressable>
            ))}
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
    paddingVertical: Dimensions.get("window").height > 1920 ? 10 : 6,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  categories: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 10,
    width: "98%",
  },
  buttons: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 0,
    width: "98%",
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

export default TvScreen;
