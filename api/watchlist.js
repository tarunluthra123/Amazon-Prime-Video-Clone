import Api from "../utils/client";

export async function fetchWatchList() {
  const response = await Api.get("/watchlist");
  const watchlist = response.data.watchlist.map((item) => ({
    ...item,
    fetchData: true,
  }));

  return watchlist || [];
}

export async function addToWatchlist(tmdb_id, media) {
  const response = await Api.post("/watchlist", {
    tmdb_id,
    media,
  });

  return response.success;
}

export async function removeFromWatchlist({ tmdb_id, media }) {
  const response = await Api.delete(`/watchlist/`, {
    data: {
      tmdb_id, media
    }
  });

  return response.success;
}
