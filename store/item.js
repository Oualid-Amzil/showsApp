import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: {},
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    storeItem(state, action) {
      state.item = action.payload;
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
