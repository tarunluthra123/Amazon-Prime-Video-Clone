import { setWatchlist, setFavourites } from "../redux/list";

export function updateWatchlist(dispatch, watchlist) {
    dispatch(setWatchlist(watchlist));
}

export function updateFavourites(dispatch, favourites) {
    dispatch(setFavourites(favourites));
}
