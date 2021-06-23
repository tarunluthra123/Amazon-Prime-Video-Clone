import React, { useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";

import { genres, BASE_URL } from "../utils/requests";
import { pingTest } from "../utils/api";
import axios from "axios";

export default function Home({ results }) {
    useEffect(() => {
        pingTest();
    }, []);

    console.log(results)

    return (
        <div>
            <Head>
                <title>Hulu Clone</title>
                <link rel="icon" icon="favicon.ico" />
            </Head>
            <Header />

            {/* Nav */}
            <NavBar />

            {/* Results */}
            <Results results={results} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const genre = context.query.find || "trending";

    const url = BASE_URL + genres[genre].url;
    const response = await axios.get(url).then((res) => res.data);

    return {
        props: {
            results: response?.results || null,
        },
    };
}
