import React from "react";
import { PlayIcon, HeartIcon, ClockIcon } from "@heroicons/react/solid";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import PersonThumbnail from "../../components/PersonThumbnail";
import SuggestionThumbnail from "../../components/SuggestionThumbnail";
import Header from "../../components/Header";
import AddToListButton from "../../components/AddToListButton";
import { BASE_IMAGE_URL } from "../../utils/requests";
import { getMovieDetails } from "../../api";

const Details = ({ details, cast, suggestions, trailer }) => {
  return (
    <div>
      <Header />

      <div
        className="h-60 p-5 flex items-end bg-top md:px-16 lg:px-20 background_poster relative lg:bg-top lg:h-half lg:items-center xl:px-48 2xl:px-72 3xl:px-96 justify-between bg-100 hover:bg-80 bg-no-repeat duration-200 transition-all lg:transition-none lg:hover:bg-100 pb-14 xs:pb-0"
        style={{
          backgroundImage: `url(${BASE_IMAGE_URL}${details.backdrop_path})`,
        }}
      >
        <div className="z-10 text-white">
          <h1 className="font-bold text-4xl text-white lg:text-5xl">
            {details.title || details.original_title}
          </h1>
          <div className="lg:block hidden pr-10">
            <div className="text-white font-bold text-md pb-1">
              <span>{details.release_date} • </span>
              <span>{details.genres.map((genre) => genre.name).join(", ")} • </span>
              <span>{details.runtime} mins</span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center w-1/4 justify-around">
                <div className="w-16 m-2">
                  <CircularProgressbarWithChildren
                    value={details.vote_average}
                    maxValue={10}
                    styles={buildStyles({
                      pathColor: "rgb(31, 180, 31)",
                      trailColor: "#0e4257",
                    })}
                  >
                    <strong>{details.vote_average}</strong>
                  </CircularProgressbarWithChildren>
                </div>
                <strong>User Score</strong>
              </div>
              <AddToListButton
                Icon={HeartIcon}
                title={"Favourites"}
                id={details.id || details.tmdb_id}
                media={"movie"}
              />
              <AddToListButton
                Icon={ClockIcon}
                title={"Watchlist"}
                id={details.id || details.tmdb_id}
                media={"movie"}
              />
              {trailer && (
                <a
                  className="flex items-center cursor-pointer mx-2 justify-around w-32 text-white hover:text-gray-300 duration-100"
                  href={trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PlayIcon className="w-10" />
                  <p>Play Trailer</p>
                </a>
              )}
            </div>

            <div className="text-gray-400 italic text-lg pb-1">{details.tagline}</div>

            <p className="text-base">{details.overview}</p>

            <div className="pt-3 text-lg">
              Produced By: <br />
              <strong>
                {details.production_companies.map((company) => company.name).join(", ")}
              </strong>
            </div>
          </div>
        </div>
        <img
          src={BASE_IMAGE_URL + details.poster_path}
          alt={details.name}
          className="max-w-1/2 z-20 h-full hidden lg:block"
          loading="lazy"
        />
      </div>

      <div className="p-5 md:px-16 lg:hidden">
        <div className="text-white font-bold text-md pb-1">
          <span>{details.release_date} • </span>
          <span>{details.genres.map((genre) => genre.name).join(", ")} • </span>
          <span>{details.runtime} mins</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center w-1/4 justify-around">
            <div className="w-16 m-2">
              <CircularProgressbarWithChildren
                value={details.vote_average}
                maxValue={10}
                styles={buildStyles({
                  pathColor: "rgb(31, 180, 31)",
                  trailColor: "#0e4257",
                })}
              >
                <strong className="text-xs sm:text-base">{details.vote_average}</strong>
              </CircularProgressbarWithChildren>
            </div>
            <strong className="text-xs sm:text-base">User Score</strong>
          </div>

          <AddToListButton
            Icon={HeartIcon}
            title={"Favourites"}
            id={details.id || details.tmdb_id}
            media={"movie"}
          />
          <AddToListButton
            Icon={ClockIcon}
            title={"Watchlist"}
            id={details.id || details.tmdb_id}
            media={"movie"}
          />

          {trailer && (
            <a
              className="flex items-center cursor-pointer mx-2 justify-around w-32 text-gray-400 hover:text-gray-200 duration-100"
              href={trailer}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon className="w-10" />
              <p>Play Trailer</p>
            </a>
          )}
        </div>

        <div className="text-gray-400 italic text-lg pb-1">{details.tagline}</div>

        <p className="text-base">{details.overview}</p>

        <div className="pt-3 text-lg">
          Produced By: <br />
          <strong>
            {details.production_companies.map((company) => company.name).join(", ")}
          </strong>
        </div>
      </div>

      <div className="p-5 md:px-16 lg:px-40 xl:px-48 2xl:px-72 3xl:px-96 lg:pt-10">
        <h2 className="text-2xl font-bold text-white mb-2 lg:text-3xl">
          Top Billed Cast
        </h2>
        <div className="flex flex-wrap w-full justify-center gap-3 lg:justify-start xl:gap-4">
          {cast.map((person) => (
            <PersonThumbnail key={person.id} person={person} />
          ))}
        </div>
      </div>

      <div className="p-5 md:px-16 lg:px-40 xl:px-48 2xl:px-72 3xl:px-96 lg:pt-10">
        <h2 className="text-2xl font-bold text-white mb-2 lg:text-3xl">
          Recommendations
        </h2>
        <div className="flex flex-wrap w-full justify-center gap-3 lg:justify-start xl:gap-4">
          {suggestions.map((suggestion) => (
            <SuggestionThumbnail key={suggestion.id} suggestion={suggestion} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { details, castList, suggestionsList, videosList } = await getMovieDetails(id);

  const cast = castList.cast.slice(0, 12).map((person) => ({
    character: person.character,
    id: person.id,
    name: person.name,
    original_name: person.original_name,
    profile_path: person.profile_path,
  }));

  const suggestions = suggestionsList.results.slice(0, 12).map((movie) => ({
    name: movie.title || movie.original_title,
    backdrop_path: movie.poster_path,
    id: movie.id,
    media: "movie",
  }));

  const trailerKey = videosList.results[0].key;
  const trailerLink = `https://www.youtube.com/watch?v=${trailerKey}`;

  return {
    props: {
      details,
      cast,
      suggestions,
      trailer: trailerLink,
    },
  };
}

export default Details;
