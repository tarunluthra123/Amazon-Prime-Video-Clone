import React, { useEffect } from "react";
// TODO: Use head
import Head from "next/head";
import axios from "axios";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";
import { genres, BASE_URL } from "../utils/requests";
import { pingTest } from "../api";

export default function Home({ results }) {
    useEffect(() => {
        pingTest();
    }, []);

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
