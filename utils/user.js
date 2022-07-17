import { batch } from "react-redux";
import { login, logout } from "../redux/auth";
import { setWatchlist, setFavourites } from "../redux/list";
import { removeRefreshToken, setAuthToken, setRefreshToken } from './storage';

export function logoutUser(dispatch) {
    removeRefreshToken();

    batch(() => {
        dispatch(logout());
        dispatch(setWatchlist([]));
        dispatch(setFavourites([]));
    });
}

export function loginUser(dispatch, access, refresh, user) {
    const { watchlist, favourites } = user;
    delete user.watchlist;
    delete user.favourites;
    batch(() => {
        dispatch(login(user));
        dispatch(setWatchlist(watchlist));
        dispatch(setFavourites(favourites));
    });

    setAuthToken(access);
    if (refresh) {
        setRefreshToken(refresh);
    }
}
