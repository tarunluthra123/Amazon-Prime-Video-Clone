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

    return (
        <div>
            <Head>
                <title>Hulu Clone</title>
                <link rel="shortcut icon" href="./favicon.ico" />
                <meta property="og:title" content="Hulu Clone" key="title" />
                <meta
                    property="og:description"
                    content="A fully functional, responsive and user friendly Hulu clone where users can browse and search their favourite movies and shows, sort them into lists and much more...."
                />
                <meta
                    property="og:url"
                    content="https://hulu-clone-amber.vercel.app/"
                />
                <meta
                    property="og:image"
                    content="./hulu-clone-screenshot.png"
                />
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
