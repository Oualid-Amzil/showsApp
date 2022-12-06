import React from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { favoritesActions } from "../store/favorites/favorites";
import { watchedActions } from "../store/watched/watched";

const baseURL = "https://image.tmdb.org/t/p/original";

const ListItem = ({ item, name }) => {
  const dispatch = useDispatch();

  const removeHandler = () => {
    if (name === "favoriteMovie") {
      dispatch(favoritesActions.removeMovie(item.id));
    } else if (name === "favoriteTv") {
      dispatch(favoritesActions.removeSerie(item.id));
    } else if (name === "watchedMovie") {
      dispatch(watchedActions.removeMovie(item.id));
    } else if (name === "watchedTv") {
      dispatch(watchedActions.removeSerie(item.id));
    }
  };

  return (
    <View style={styles.border}>
      <View style={styles.container}>
        <View style={styles.imageWrraper}>
          <Image
            source={{ uri: `${baseURL}${item.backdrop_path}` }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <LinearGradient
            colors={["#FECD70", "#FD841F"]}
            locations={[0.1, 0.9]}
            style={styles.gradient}
          >
            <Pressable style={styles.button} onPress={removeHandler}>
              <Ionicons
                name={Platform ? "md-close-sharp" : "ios-close-sharp"}
                size={30}
                color="black"
              />
            </Pressable>
            <Text style={styles.title}>
              {item?.title || item?.name || item?.original_name}
            </Text>
            <View style={styles.detailsChild}>
              <Text style={styles.label}>
                Release date:{" "}
                <Text style={styles.child}>
                  {" "}
                  {item?.release_date || item?.first_air_date}
                </Text>
              </Text>
              <View style={styles.content}>
                <Text style={styles.label}>
                  language:{" "}
                  <Text style={styles.child}>{item?.original_language}</Text>
                </Text>
                <Text style={styles.label}>
                  rate:{" "}
                  <Text style={styles.child}>
                    {item?.vote_average.toFixed(1)}
                    <Ionicons name="md-star" size={18} />
                  </Text>
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    width: "98%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  container: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 6,
    overflow: "hidden",
  },

  imageWrraper: {
    width: "38%",
    height: Dimensions.get("window").height / 5,
    objectFit: "cover",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  details: {
    width: "62%",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "flex-start",
    justifyContent: "space-around",
    position: "relative",
  },
  button: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  detailsChild: {
    justifyContent: "space-between",
  },
  title: {
    color: "#001253",
    letterSpacing: 0.3,
    fontFamily: "ptserif-bold",
    fontSize: 19,
  },
  content: {
    fontFamily: "ptserif-bold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "ptserif-bold",
    fontSize: 17,
    color: "#001253",
  },
  child: {
    fontSize: 15,
    color: "black",
  },
});

export default ListItem;
