import routes from "../constants/routes";
import client from "./client";

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

export async function addToWatchlist(tmdb_id, media) {
  const url = routes.watchlist.add.url;
  const response = await client
    .post(url, { tmdb_id, media })
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
