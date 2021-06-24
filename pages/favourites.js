import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";
import { fetchFavourites } from "../utils/api";
import { updateFavourites } from "../utils/lists";
import { useDispatch } from "react-redux";

export default function Favourites({}) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(async () => {
        const response = await fetchFavourites();
        setResults(response);
        setLoading(false);
        updateFavourites(dispatch, response);
    }, []);

    return (
        <div>
            <Header />

            {/* Nav */}
            <NavBar />

            <h1 className="text-center mt-10 font-bold text-2xl lg:text-3xl">
                Favourites
            </h1>

            {loading && <div>Loading...</div>}

            {/* Results */}
            {!loading && <Results results={results} />}
        </div>
    );
}
