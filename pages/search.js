import React from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";
import { querySearch } from "../utils/requests";

export default function Search({ results }) {
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
    const query = context.query.query;

    if (!query || query?.length == 0 || query == "") {
        return {
            redirect: {
                destination: "/",
            },
        };
    }

    const results = await querySearch(query);

    return {
        props: {
            results: results || null,
        },
    };
}
