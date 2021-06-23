import axios from "axios";
import { getAuthToken, getRefreshToken } from "./token";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: { "content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
    (request) => {
        const token = getAuthToken();
        console.log({ token });
        if (token && token != "undefined" && token != "null") {
            request.headers["Authorization"] = `Bearer ${token}`;
        }
        request.headers["Content-Type"] = "application/json";
        return request;
    },
    (error) => {
        if (
            error.response?.status == 401 ||
            error.response?.data.message === "401 Unauthorized"
        ) {
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (error.response?.status == 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAuthToken = getRefreshToken();
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${newAuthToken}`;
            return axiosInstance(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axios;

export const routes = {
    ping: {
        url: "/ping",
        method: "GET",
    },
    auth: {
        details: {
            url: "/user/",
            method: "GET",
        },
        login: {
            url: "/auth/",
            method: "POST",
        },
        signup: {
            url: "/auth/create",
            method: "POST",
        },
        refresh: {
            url: "/auth/refresh",
            method: "POST",
        },
    },
    watchlist: {
        fetch: {
            url: "/watchlist",
            method: "GET",
        },
        add: {
            url: "/watchlist",
            method: "POST",
        },
        remove: {
            url: "/watchlist",
            method: "PATCH",
        },
    },
    favourites: {
        fetch: {
            url: "/favourites",
            method: "GET",
        },
        add: {
            url: "/favourites",
            method: "POST",
        },
        remove: {
            url: "/favourites",
            method: "PATCH",
        },
    },
};

export async function pingTest() {
    const url = routes.ping.url;
    try {
        const response = await axiosInstance.get(url).then((res) => res.data);
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
        const response = await axiosInstance
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
        const response = await axiosInstance
            .post(url, { username, password, name })
            .then((res) => res.data);

        return response;
    } catch (error) {
        return {
            error,
        };
    }
}

export async function refreshToken(refresh) {
    const url = routes.auth.refresh.url;
    try {
        const response = await axiosInstance
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
        const response = await axiosInstance
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
    const response = await axiosInstance
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
    const response = await axiosInstance
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
    const response = await axiosInstance
        .post(url, { tmdb_id, media })
        .then((res) => res.data);
    return response;
}

export async function addToFavourites(tmdb_id, media) {
    const url = routes.favourites.add.url;
    const response = await axiosInstance
        .post(url, { tmdb_id, media })
        .then((res) => res.data);
    return response;
}

export async function removeFromFavourites(tmdb_id, media) {
    const url = routes.favourites.add.url;
    const response = await axiosInstance
        .patch(url, { tmdb_id, media })
        .then((res) => res.data);
    return response;
}

export async function removeFromWatchlist(tmdb_id, media) {
    const url = routes.watchlist.add.url;
    const response = await axiosInstance
        .patch(url, { tmdb_id, media })
        .then((res) => res.data);
    return response;
}
