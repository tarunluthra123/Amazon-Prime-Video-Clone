import routes from "../constants/routes";
import client from "./client";

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
