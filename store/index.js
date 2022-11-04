import { configureStore } from "@reduxjs/toolkit";

import itemSlice from "./item";
import watchedSlice from "./watched";
import favoritesSlice from "./favorites";
import uiSlice from "./ui";

const store = configureStore({
  reducer: {
    item: itemSlice.reducer,
    watched: watchedSlice.reducer,
    favorites: favoritesSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
