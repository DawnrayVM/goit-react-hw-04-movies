import { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import noImg from '../../img/no-image.jpg';
import { fetchCast } from '../../components/services/movie-api';

const useStyles = createUseStyles({
    listReset: {
        marginTop: 20,
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        color: '#022b69',
    },
    listItem: {
        textAlign: 'center',
        marginRight: 5,
        flexBasis: 200,
    },
});

const Cast = ({ match }) => {
    const [state, setState] = useState({ cast: [] });
    const classes = useStyles();
    useEffect(() => {
        fetchCast(match.params.movieId).then(({ cast }) => {
            setState({
                cast: cast
                    .filter(({ order }) => order <= 10)
                    .map(({ id, name, profile_path, character }) => ({
                        id,
                        name,
                        profile_path: profile_path
                            ? 'https://image.tmdb.org/t/p/w185' + profile_path
                            : noImg,
                        character,
                    })),
            });
        });
    }, []);
    return (
        <ul className={classes.listReset}>
            {state.cast.length > 0 &&
                state.cast.map(({ id, profile_path, name, character }) => {
                    return (
                        <li key={id} className={classes.listItem}>
                            <img src={profile_path} alt={name} />
                            <h6>{name}</h6>
                            <p>Character: {character}</p>
                        </li>
                    );
                })}
        </ul>
    );
};

export default Cast;

Cast.propTypes = {
    match: PropTypes.shape({
        isExact: PropTypes.bool,
        params: PropTypes.shape({ movieId: PropTypes.string }),
        path: PropTypes.string,
        url: PropTypes.string,
    }),
};
