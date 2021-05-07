import axios from "axios";
import { BASE_URL, movies_category, tv_category } from "../utils/requests";
import useSWR from "swr";

axios.defaults.baseURL = BASE_URL;

export function fetchMovies({ genre } = { genre: "trending" }) {
    const url = movies_category[genre].url;
    const { data, error } = useSWR(url, async (url) => {
        const response = await axios.get(url).then((res) => res.data);
        return response;
    });
    // console.log({ data, error });
    if (data) return data;
}
