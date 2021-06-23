import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";

import { genres, BASE_URL, querySearch } from "../utils/requests";
import axios from "axios";
import { fetchWatchList } from "../utils/api";

export default function Watchlist({}) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    useEffect(async () => {
        const response = await fetchWatchList();
        setResults(response);
        setLoading(false);
    }, []);

    console.log(results, loading);

    return (
        <div>
            <Header />

            {/* Nav */}
            <NavBar />

            <h1 className="text-center mt-10 font-bold text-2xl lg:text-3xl">
                Watchlist
            </h1>

            {loading && <div>Loading...</div>}

            {/* Results */}
            {!loading && <Results results={results} />}
        </div>
    );
}
