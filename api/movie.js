import { find, BASE_URL, credits, recommendations, trailer } from "../utils/requests";
import axios from "axios";

export async function getMovieDetails(id) {
  let url = BASE_URL + find.movie.url(id);
  const details = await axios.get(url).then((res) => res.data);
  url = BASE_URL + credits.movie.url(id);
  const castList = await axios.get(url).then((res) => res.data);
  url = BASE_URL + recommendations.movie.url(id);
  const suggestionsList = await axios.get(url).then((res) => res.data);
  url = BASE_URL + trailer.movie.url(id);
  const videosList = await axios.get(url).then((res) => res.data);

  return {
    details,
    castList,
    suggestionsList,
    videosList,
  };
}
