export const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;
export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

export const genres = {
    trending: {
        title: "Trending",
        url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    },
    toprated: {
        title: "Top Rated",
        url: `/movie/top_rated?api_key=${API_KEY}&language=en`,
    },
    action: {
        title: "Action",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    },
    adventure: {
        title: "Adventure",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
    },
    animation: {
        title: "Animation",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    },
    comedy: {
        title: "Comedy",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    },
    crime: {
        title: "Crime",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
    },
    documentary: {
        title: "Documentary",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    },
    drama: {
        title: "Drama",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
    },
    family: {
        title: "Family",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
    },
    fantasy: {
        title: "Fantasy",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
    },
    history: {
        title: "History",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=36`,
    },
    horror: {
        title: "Horror",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    },
    music: {
        title: "Music",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10402`,
    },
    mystery: {
        title: "Mystery",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
    },
    romance: {
        title: "Romance",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    },
    scienceFiction: {
        title: "Science Fiction",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
    },
    tvMovie: {
        title: "TV Movie",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
    },
    thriller: {
        title: "Thriller",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
    },
    war: {
        title: "War",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
    },
    western: {
        title: "Western",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
    },
};

export const find = {
    movie: {
        title: "Find Movie by ID",
        url: function (id) {
            return `/movie/${id}?api_key=${API_KEY}`;
        },
    },
    tv: {
        title: "Find TV Series by ID",
        url: function (id) {
            return `/tv/${id}?api_key=${API_KEY}`;
        },
    },
};

export const credits = {
    movie: {
        title: "Find credits for Movie by ID",
        url: function (id) {
            return `/movie/${id}/credits?api_key=${API_KEY}`;
        },
    },
    tv: {
        title: "Find credits for TV Series by ID",
        url: function (id) {
            return `/tv/${id}/credits?api_key=${API_KEY}`;
        },
    },
};

export const recommendations = {
    tv: {
        title: "Find recommendations for TV Series",
        url: function (id) {
            return `/tv/${id}/recommendations?api_key=${API_KEY}`;
        },
    },
    movie: {
        url: function (id) {
            return `/movie/${id}/recommendations?api_key=${API_KEY}`;
        },
    },
};

export const trailer = {
    tv: {
        url: function (id) {
            return `/tv/${id}/videos?api_key=${API_KEY}`;
        },
    },
    movie: {
        url: function (id) {
            return `/movie/${id}/videos?api_key=${API_KEY}`;
        },
    },
};
