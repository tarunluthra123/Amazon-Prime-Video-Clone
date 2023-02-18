import supabase from "../utils/supabase";

export async function fetchWatchList(user) {
  const { data, error } = await supabase
    .from('watchlist')
    .select()
    .eq('user_id', user.id);
  
  if (error || !data) return [];

  const watchlist = data.map((item) => ({
    ...item,
    fetchData: true,
  }));

  return watchlist || [];
}

export async function addToWatchlist(tmdb_id, media, user) {
  const { data } = await supabase
    .from('watchlist')
    .insert({
      user_id: user.id,
      tmdb_id,
      media,
    });
  
  return data;
}

export async function removeFromWatchlist(id) {
  const { error } = await supabase
    .from('watchlist')
    .delete()
    .eq('id', id);
  return !!error;
}
