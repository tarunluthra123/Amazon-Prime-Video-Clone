import React from "react";
import { BASE_IMAGE_URL } from "../utils/requests";
import Router from "next/router";

const SuggestionThumbnail = ({ suggestion }) => {
    const { id, backdrop_path, name } = suggestion;
    return (
        <div
            className="border border-solid border-gray-300 flex flex-col w-40 rounded cursor-pointer"
            onClick={() => {
                Router.push("/tv/" + id);
            }}
        >
            <img
                src={BASE_IMAGE_URL + backdrop_path}
                alt={name}
                className="w-full"
            />
            <div className="p-2">
                <strong>{name}</strong>
            </div>
        </div>
    );
};

export default SuggestionThumbnail;
