import React from "react";
import axios from "axios";
import { find, BASE_URL, credits, BASE_IMAGE_URL } from "../../utils/requests";

const Details = ({ result }) => {
    return <div>{result.title}</div>;
};

export async function getServerSideProps(context) {
    const { id } = context.query;
    const url = BASE_URL + find.movie.url(id);
    const response = await axios.get(url).then((res) => res.data);

    return {
        props: {
            result: response || null,
        },
    };
}

export default Details;
