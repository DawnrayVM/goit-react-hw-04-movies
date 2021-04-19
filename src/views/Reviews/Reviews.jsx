import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { fetchReviews } from '../../components/services/movie-api';

const useStyles = createUseStyles({
    listReset: {
        marginTop: 20,
        listStyle: 'none',
        padding: 0,
        color: '#022b69',
    },
});

const Reviews = ({ match }) => {
    const [state, setState] = useState({ reviews: [] });
    const classes = useStyles();
    useEffect(() => {
        fetchReviews(match.params.movieId).then(({ results }) => {
            setState({ reviews: results });
        });
    }, []);
    return (
        <ul className={classes.listReset}>
            {state.reviews.length > 0 ? (
                state.reviews.map(({ id, author, content }) => {
                    return (
                        <li key={id}>
                            <h2>Author: {author}</h2>
                            <p align="justify">{`"${content}"`}</p>
                        </li>
                    );
                })
            ) : (
                <p>No reviews yet</p>
            )}
        </ul>
    );
};
export default Reviews;

Reviews.propTypes = {
    match: PropTypes.shape({
        isExact: PropTypes.bool,
        params: PropTypes.shape({ movieId: PropTypes.string }),
        path: PropTypes.string,
        url: PropTypes.string,
    }),
};
