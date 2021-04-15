import Axios from 'axios';

const options = { key: '2d2272085b6a086155bacb1413ae9080', page: 1 };

const fetchTrending = () => {
    return Axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${options.key}&page=${options.page}`,
    ).then(({ data }) => data);
};

export { fetchTrending };
