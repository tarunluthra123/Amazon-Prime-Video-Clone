import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";
import { fetchWatchList } from "../utils/api";
import { updateWatchlist } from "../utils/lists";

export default function Watchlist({}) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(async () => {
        const response = await fetchWatchList();
        setResults(response);
        setLoading(false);
        updateWatchlist(dispatch, response);
    }, []);

    return (
        <div>
            <Header />

            {/* Nav */}
            <NavBar />

            <h1 className="text-center mt-10 font-bold text-2xl lg:text-3xl">
                Watchlist
            </h1>

            {loading && <div className="loader">Loading...</div>}

            {/* Results */}
            {!loading && <Results results={results} />}
        </div>
    );
}
