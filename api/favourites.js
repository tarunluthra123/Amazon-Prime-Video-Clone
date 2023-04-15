import Api from "../utils/client";

export async function fetchFavourites() {
  const response = await Api.get("/favourites");
  const list = response.data.favourites.map((item) => ({
    ...item,
    fetchData: true,
  }));

  return list || [];
}

export async function addToFavourites(tmdb_id, media) {
  const response = await Api.post("/favourites", {
    tmdb_id,
    media,
  });

  return response.success;
}

export async function removeFromFavourites({ tmdb_id, media }) {
  const response = await Api.delete(`/favourites/`, {
    data: {
      tmdb_id, media
    }
  });

  return response.success;
}
