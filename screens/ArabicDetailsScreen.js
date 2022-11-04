import { processFontFamily } from "expo-font";
import { useState, useEffect } from "react";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "react-native-vector-icons";
import instance from "../axios";

import Colors from "../constant/Colors";

const baseURL = "https://image.tmdb.org/t/p/original";

const ArabicDetailsScreen = () => {
  const movie = useSelector((state) => state.movie.movie);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [overView, setOverView] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await instance.get(
          `/tv/${movie.id}/translations?api_key=f85e3b31e546a3339733a14746d23b6a`
        );
        const arabic = response.data.translations.find(
          (item) => item.name === "العربية"
        );
        setOverView(response.data.translations[0].data.overview);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: `${baseURL}${movie.backdrop_path}` }}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>
          {movie?.title || movie?.name || movie?.original_name}
        </Text>
        <Text style={styles.label}>
          تاريخ الانتاج:{" "}
          <Text style={styles.child}>
            {" "}
            {movie.release_date || movie.first_air_date}
          </Text>
        </Text>
        <View style={styles.content}>
          <Text style={styles.label}>
            اللغة: <Text style={styles.child}>{movie.original_language}</Text>
          </Text>
          <Text style={styles.label}>
            التقييم:{" "}
            <Text style={styles.child}>
              {movie.vote_average.toFixed(1)}
              <Ionicons name="md-star" size={18} />
            </Text>
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.label}>تفصيل:</Text>
          <Text style={styles.paragraph}>{overView}</Text>
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
  },
  image: {
    width: "100%",
    height: "100%",
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
    textAlign: "right",
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
    fontFamily: "arabic-font",
    lineHeight: 28,
    paddingHorizontal: 25,
    paddingVertical: 10,
    color: "black",
    textAlign: "right",
  },
  error: {
    color: "red",
    fontFamily: "lato-bold",
    fontSize: 20,
  },
});

export default ArabicDetailsScreen;
