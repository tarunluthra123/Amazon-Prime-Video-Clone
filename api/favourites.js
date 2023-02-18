import supabase from "../utils/supabase";

export async function fetchFavourites(user) {
  const { data, error } = await supabase
    .from('favourites')
    .select()
    .eq('user_id', user.id);

  if (error || !data) return [];

  const watchlist = data.map((item) => ({
    ...item,
    fetchData: true,
  }));

  return watchlist || [];
}

export async function addToFavourites(tmdb_id, media, user) {
  const { data } = await supabase
    .from('favourites')
    .insert({
      user_id: user.id,
      tmdb_id,
      media,
    });

  return data;
}

export async function removeFromFavourites(id) {
  const { error } = await supabase
    .from('favourites')
    .delete()
    .eq('id', id);
  return !!error;
}
