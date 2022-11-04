import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";

import { getWatchedData } from "../store/watched-actions";
import { getFavoritesData } from "../store/favorites-actions";
import CategoryItem from "../component/CategoryItem";
import { TvRequests } from "../requests";
import Colors from "../constant/Colors";

const SeriesCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchedData());
    dispatch(getFavoritesData());
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        {TvRequests.map((item) => (
          <CategoryItem
            request={item}
            key={item.id}
            navigation={navigation}
            label="tv"
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

export default SeriesCategoryScreen;
