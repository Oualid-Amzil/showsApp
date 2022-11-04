import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";

import { getFavoritesData } from "../store/favorites-actions";
import { getWatchedData } from "../store/watched-actions";

import CategoryItem from "../component/CategoryItem";
import { MoviesRequests } from "../requests";
import Colors from "../constant/Colors";

const MoviesCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchedData());
    dispatch(getFavoritesData());
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        {MoviesRequests.map((item) => (
          <CategoryItem
            request={item}
            key={item.id}
            navigation={navigation}
            label="movies"
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.primaryColor,
  },
});

export default MoviesCategoryScreen;
