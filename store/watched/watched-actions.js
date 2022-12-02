import axios from "axios";

import { uiActions } from "../ui";
import { watchedActions } from "./watched";

export const sendWatchedData = (data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    dispatch(uiActions.error(null));
    try {
      await axios({
        method: "put",
        url: `
        https://shows-discover-default-rtdb.firebaseio.com/watched/${userId}.json?auth=${token}`,
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

export const getWatchedData = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    dispatch(uiActions.error(null));
    dispatch(uiActions.isLoading(true));
    try {
      const response = await axios({
        method: "get",
        url: `
        https://shows-discover-default-rtdb.firebaseio.com/watched/${userId}.json?auth=${token}`,
      });

      dispatch(
        watchedActions.replaceWatchedItems({
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
