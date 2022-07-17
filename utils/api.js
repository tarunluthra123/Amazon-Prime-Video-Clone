import routes from '../constants/routes';
import client from './client';

export async function pingTest() {
    const url = routes.ping.url;
    try {
        const response = await client.get(url).then((res) => res.data);
        return response;
    } catch (error) {
        console.error(error);
        setTimeout(() => {
            pingTest();
        }, 3000);
    }
}

export async function signInUser(username, password) {
    const url = routes.auth.login.url;
    try {
        const response = await client
            .post(url, JSON.stringify({ username, password }))
            .then((res) => res.data);

        return response;
    } catch (error) {
        return {
            error,
        };
    }
}

export async function signUpUser(username, password, name) {
    const url = routes.auth.signup.url;
    try {
        const response = await client
            .post(url, { username, password, name })
            .then((res) => res.data);

        return response;
    } catch (error) {
        return {
            error,
        };
    }
}

export async function refreshAuthToken(refresh) {
    const url = routes.auth.refresh.url;
    try {
        const response = await client
            .post(url, { refresh })
            .then((res) => res.data);
        return response;
    } catch (error) {
        return {
            error,
        };
    }
}

export async function getUserDetails(access) {
    const url = routes.auth.details.url;
    try {
        const response = await client
            .get(url, { headers: { Authorization: `Bearer ${access}` } })
            .then((res) => res.data);
        return response;
    } catch (error) {
        return {
            error,
        };
    }
}

export async function fetchWatchList() {
    const url = routes.watchlist.fetch.url;
    const response = await client
        .get(url)
        .then((res) => res.data)
        .catch((err) => {
            console.error(err.response.data.error);
        });

    if (!response) {
        return [];
    }

    const list = response?.watchlist;

    const watchlist = list.map((item) => ({
        ...item,
        fetchData: true,
    }));

    return watchlist || [];
}

export async function fetchFavourites() {
    const url = routes.favourites.fetch.url;
    const response = await client
        .get(url)
        .then((res) => res.data)
        .catch((err) => {
            console.error(err.response.data.error);
        });

    if (!response) {
        return [];
    }

    const list = response?.favourites;

    const favourites = list.map((item) => ({
        ...item,
        fetchData: true,
    }));

    return favourites || [];
}

export async function addToWatchlist(tmdb_id, media) {
    const url = routes.watchlist.add.url;
    const response = await client
        .post(url, { tmdb_id, media })
        .then((res) => res.data);
    return response;
}

export async function addToFavourites(tmdb_id, media) {
    const url = routes.favourites.add.url;
    const response = await client
        .post(url, { tmdb_id, media })
        .then((res) => res.data);
    return response;
}

export async function removeFromFavourites(tmdb_id, media) {
    const url = routes.favourites.add.url;
    const response = await client
        .patch(url, { tmdb_id, media })
        .then((res) => res.data);
    return response;
}

export async function removeFromWatchlist(tmdb_id, media) {
    const url = routes.watchlist.add.url;
    const response = await client
        .patch(url, { tmdb_id, media })
        .then((res) => res.data);
    return response;
}
