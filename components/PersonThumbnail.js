import React from "react";
import Image from 'next/image';
import { BASE_IMAGE_URL } from "../utils/requests";

const PersonThumbnail = ({ person }) => {
    const { character, name, original_name, profile_path } = person;

    return (
        <div className="border border-solid border-gray-300 flex flex-col w-24 sm:w-32 rounded lg:w-36 xl:w-40 lg:h-auto">
            <Image
                src={BASE_IMAGE_URL + profile_path}
                alt={name}
                className="w-full h-2/3 rounded"
                layout="intrinsic"
                height={2160}
                width={1920}
            />
            <div className="p-2 w-full">
                <strong>{name || original_name}</strong>
                <p className="text-gray-400">{character}</p>
            </div>
        </div>
    );
};

export default PersonThumbnail;
