import Axios from 'axios';

const options = { key: '2d2272085b6a086155bacb1413ae9080' };

const fetchTrending = (page = 1) => {
    return Axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${options.key}&page=${page}`,
    ).then(({ data }) => data);
};

const searchMovie = (query, page = 1) => {
    return Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${options.key}&query=${query}&page=${page}`,
    ).then(({ data }) => {
        // console.log(data);
        return data;
    });
};

const fetchCast = movieId => {
    return Axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${options.key}`,
    ).then(({ data }) => {
        // console.log(data);
        return data;
    });
};

const fetchReviews = movieId => {
    return Axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${options.key}`,
    ).then(({ data }) => {
        // console.log(data);
        return data;
    });
};

const fetchMovieDetails = movieId => {
    return Axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=2d2272085b6a086155bacb1413ae9080`,
    );
};

export {
    fetchTrending,
    searchMovie,
    fetchCast,
    fetchReviews,
    fetchMovieDetails,
};
