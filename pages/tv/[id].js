import React from "react";
import axios from "axios";
import {
    find,
    BASE_URL,
    BASE_IMAGE_URL,
    credits,
    recommendations,
} from "../../utils/requests";
import PersonThumbnail from "../../components/PersonThumbnail";
import SuggestionThumbnail from "../../components/SuggestionThumbnail";
import Header from "../../components/Header";

const Details = ({ details, cast, suggestions }) => {
    console.log(details);
    return (
        <div>
            <Header />

            <div
                className="h-60 p-5 bg-cover flex items-end bg-center group"
                style={{
                    backgroundImage: `url(${BASE_IMAGE_URL}${details.backdrop_path})`,
                }}
            >
                <h1 className="font-bold text-4xl text-white group-hover:text-5xl duration-200 cursor-pointer transition-all">
                    {details.name}
                </h1>
            </div>

            <div className="p-5">
                <div className="text-white font-bold text-md pb-1">
                    <span>{details.first_air_date} • </span>
                    <span>
                        {details.genres.map((genre) => genre.name).join(", ")} •{" "}
                    </span>
                    <span>{details.episode_run_time} mins</span>
                </div>
                <div className="text-gray-400 italic text-lg pb-1">
                    {details.tagline}
                </div>
                <p className="text-base">{details.overview}</p>
                <div className="pt-3 text-lg">
                    Created By:{" "}
                    <strong>
                        {details.created_by
                            .map((creator) => creator.name)
                            .join(", ")}
                    </strong>
                </div>
            </div>

            <div className="p-5">
                <h2 className="text-2xl font-bold text-white mb-2">
                    Top Billed Cast
                </h2>
                <div className="flex flex-wrap w-full justify-center gap-3">
                    {cast.map((person) => (
                        <PersonThumbnail key={person.id} person={person} />
                    ))}
                </div>
            </div>

            <div className="p-5">
                <h2 className="text-2xl font-bold text-white mb-2">
                    Recommendations
                </h2>
                <div className="flex flex-wrap w-full justify-center gap-3">
                    {suggestions.map((suggestion) => (
                        <SuggestionThumbnail
                            key={suggestion.id}
                            suggestion={suggestion}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;
    let url = BASE_URL + find.tv.url(id);
    const details = await axios.get(url).then((res) => res.data);
    url = BASE_URL + credits.tv.url(id);
    const castList = await axios.get(url).then((res) => res.data);
    url = BASE_URL + recommendations.tv.url(id);
    const suggestionsList = await axios.get(url).then((res) => res.data);

    const cast = castList.cast.map((person) => ({
        character: person.character,
        id: person.id,
        name: person.name,
        original_name: person.original_name,
        profile_path: person.profile_path,
    }));

    const suggestions = suggestionsList.results.slice(0, 12).map((show) => ({
        name: show.name,
        backdrop_path: show.backdrop_path,
        id: show.id,
    }));

    return {
        props: {
            details,
            cast,
            suggestions,
        },
    };
}

export default Details;
