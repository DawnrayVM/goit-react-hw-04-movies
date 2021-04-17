import { useState, useEffect, useLayoutEffect, Component } from 'react';
import { useCreateStyles } from 'react-jss';
import { fetchCast } from '../../components/services/movie-api';

const Cast = ({ match }) => {
    const [state, setState] = useState({ cast: [] });
    useLayoutEffect(() => {
        fetchCast(match.params.movieId).then(({ cast }) => {
            setState({
                cast: cast
                    .filter(({ order }) => order <= 10)
                    .map(({ id, name, profile_path, character }) => ({
                        id,
                        name,
                        profile_path:
                            'https://image.tmdb.org/t/p/w185' + profile_path,
                        character,
                    })),
            });
        });
    }, []);
    return (
        <ul className="cast-container">
            {state.cast.length > 0 &&
                state.cast.map(data => {
                    return (
                        <li key={data.id}>
                            <img src={data.profile_path} />
                            <h3>{data.name}</h3>
                            <p>Character: {data.character}</p>
                        </li>
                    );
                })}
        </ul>
    );
};

export default Cast;
