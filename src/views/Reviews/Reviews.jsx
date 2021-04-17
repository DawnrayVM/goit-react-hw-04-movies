import { useEffect, useState } from 'react';
import { fetchReviews } from '../../components/services/movie-api';

const Reviews = ({ match }) => {
    const [state, setState] = useState({ reviews: [] });
    useEffect(() => {
        console.log('did mount');
        fetchReviews(match.params.movieId).then(({ results }) => {
            setState({ reviews: results });
        });
    }, []);
    return (
        console.log('render'),
        (
            <section className="cast-container">
                <ul></ul>
            </section>
        )
    );
};
export default Reviews;
