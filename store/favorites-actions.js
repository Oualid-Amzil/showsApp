import axios from "axios";

import { uiActions } from "./ui";
import { favoritesActions } from "./favorites";

export const sendFavoritesData = (data) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: "https://discover-shows-app-default-rtdb.firebaseio.com/favorites.json",
        data: {
          movies: data.movies,
          series: data.series,
        },
      });
    } catch (error) {
      dispatch(uiActions.error(error.message));
    }
  };
};

export const getFavoritesData = () => {
  return async (dispatch) => {
    dispatch(uiActions.isLoading(true));
    try {
      const response = await axios({
        method: "get",
        url: "https://discover-shows-app-default-rtdb.firebaseio.com/favorites.json",
      });

      dispatch(
        favoritesActions.replaceFavoriteItems({
          movies: response.data.movies ? response.data.movies : [],
          series: response.data.series ? response.data.series : [],
        })
      );
      dispatch(uiActions.isLoading(false));
    } catch (error) {
      dispatch(uiActions.isLoading(false));
      dispatch(uiActions.error(error.message));
    }
  };
};
