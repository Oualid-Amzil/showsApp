import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  series: [],
  changed: false,
};

const watchedSlice = createSlice({
  name: "watched",
  initialState,
  reducers: {
    replaceWatchedItems(state, action) {
      state.movies = action.payload.movies;
      state.series = action.payload.series;
    },
    addMovie(state, action) {
      state.movies = [action.payload, ...state.movies];
      state.changed = true;
    },
    removeMovie(state, action) {
      state.movies = state.movies.filter((item) => item.id !== action.payload);
      state.changed = true;
    },
    addSerie(state, action) {
      state.series = [action.payload, ...state.series];
      state.changed = true;
    },
    removeSerie(state, action) {
      state.series = state.series.filter((item) => item.id !== action.payload);
      state.changed = true;
    },
  },
});

export const watchedActions = watchedSlice.actions;

export default watchedSlice;
