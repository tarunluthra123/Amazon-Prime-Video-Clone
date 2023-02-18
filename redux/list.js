import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "lists",
  initialState: {
    watchlist: [],
    favourites: [],
  },
  reducers: {
    setWatchlist(state, action) {
      state.watchlist = action.payload;
    },
    setFavourites(state, action) {
      state.favourites = action.payload;
    },
    resetLists(state) {
      state.watchlist = [];
      state.favourites = [];
    }
  },
});

export const { setWatchlist, setFavourites, resetLists } = listSlice.actions;

export default listSlice.reducer;
