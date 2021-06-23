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
    },
});

export const { setWatchlist, setFavourites } = listSlice.actions;

export default listSlice.reducer;
