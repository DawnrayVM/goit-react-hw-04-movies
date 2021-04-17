import { useState, useEffect, useLayoutEffect, Component } from 'react';
import { useCreateStyles } from 'react-jss';
import { fetchCast } from '../../components/services/movie-api';
import CastItem from '../../components/CastItem';

const Cast = ({ match }) => {
    const [state, setState] = useState({ cast: [] });
    useLayoutEffect(() => {
        console.log('did mount');
        fetchCast(match.params.movieId).then(({ cast }) => {
            setState({ cast: cast });
        });
    }, []);
    console.log('before render');
    return (
        console.log('render'),
        (
            <section className="cast-container">
                <ul>
                    <CastItem data={state.cast} />
                </ul>
            </section>
        )
    );
};

export default Cast;
