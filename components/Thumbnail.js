import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import Router from "next/router";
import { ThumbUpIcon } from "@heroicons/react/solid";
import {
    BASE_IMAGE_URL,
    fetchMovieDetails,
    fetchTvSeriesDetails,
} from "../utils/requests";

const Thumbnail = forwardRef(({ result }, ref) => {
    const [details, setDetails] = useState({});

    useEffect(async () => {
        if (result?.fetchData) {
            if (result.media == "tv") {
                const response = await fetchTvSeriesDetails(result.tmdb_id);
                setDetails(response);
            } else {
                const response = await fetchMovieDetails(result.tmdb_id);
                setDetails(response);
            }
        } else {
            setDetails(result);
        }
    }, []);

    if (!details?.overview) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div
            ref={ref}
            className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 max-w-lg"
            onClick={() =>
                Router.push(
                    `/${
                        details.media_type ||
                        details.media ||
                        result.media ||
                        "movie"
                    }/${details.id}`
                )
            }
        >
            <Image
                layout="responsive"
                src={`${BASE_IMAGE_URL}${
                    details.backdrop_path || details.poster_path
                }`}
                height={1080}
                width={1920}
            />
            <div className="p-2">
                <p className="truncate max-w-md">{details.overview}</p>
                <h2 className="mt-1 text-2xl text-white group-hover:font-bold  transition-all duration-100 ease-in-out">
                    {details.title || details.name || details.original_name}
                </h2>
                <p className="flex items-center invisible group-hover:visible group-hover:text-white">
                    {`${details.release_date || details.first_air_date} • `}
                    <ThumbUpIcon className="h-5 mx-2" />
                    {details.vote_count}
                </p>
            </div>
        </div>
    );
});

export default Thumbnail;
