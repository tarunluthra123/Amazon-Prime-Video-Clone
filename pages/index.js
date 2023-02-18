import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";
import { genres, BASE_URL } from "../utils/requests";
import getUser from "../hooks/getUser";
import { fetchFavourites, fetchWatchList } from "../api";
import { setFavourites, setWatchlist } from "../redux/list";

export default function Home({ results }) {
  const user = getUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !user.isLoggedIn) return;
    const populateData = async () => {
      const favourites = await fetchFavourites(user);
      dispatch(setFavourites(favourites));
      const watchlist = await fetchWatchList(user);
      dispatch(setWatchlist(watchlist));
    };
    populateData();
  }, [user]);

  return (
    <div>
      <Header />

      {/* Nav */}
      <NavBar />

      {/* Results */}
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  // TODO: Set context.res caching
  const genre = context.query.find || "trending";

  const url = BASE_URL + genres[genre].url;
  const response = await axios.get(url).then((res) => res.data);

  return {
    props: {
      results: response?.results || null,
    },
  };
}
