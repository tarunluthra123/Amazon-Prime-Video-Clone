import React from "react";
import Router from "next/router";
import Image from "next/image";
import { BASE_IMAGE_URL } from "../utils/requests";

const SuggestionThumbnail = ({ suggestion }) => {
    const { id, backdrop_path, name, media } = suggestion;
    return (
        <div
            className="border border-solid border-gray-300 flex flex-col rounded cursor-pointer w-24 sm:w-32 lg:w-36 xl:w-40 lg:h-auto"
            onClick={() => {
                Router.push(`/${media}/${id}`);
            }}
        >
            <Image
                src={BASE_IMAGE_URL + backdrop_path}
                alt={name}
                className="w-full"
                layout="intrinsic"
                height={2160}
                width={1080}
            />
            <div className="p-2">
                <strong>{name}</strong>
            </div>
        </div>
    );
};

export default SuggestionThumbnail;
