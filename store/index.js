import { configureStore } from "@reduxjs/toolkit";

import itemSlice from "./item";
import watchedSlice from "./watched/watched";
import favoritesSlice from "./favorites/favorites";
import uiSlice from "./ui";
import authSlice from "./auth/auth";

const store = configureStore({
  reducer: {
    item: itemSlice.reducer,
    watched: watchedSlice.reducer,
    favorites: favoritesSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
