import { useEffect, useState } from 'react';
import { fetchReviews } from '../../components/services/movie-api';

const Reviews = ({ match }) => {
    const [state, setState] = useState({ reviews: [] });
    useEffect(() => {
        fetchReviews(match.params.movieId).then(({ results }) => {
            setState({ reviews: results });
        });
    }, []);
    return (
        <ul className="reviews-container">
            {state.reviews.length > 0 ? (
                state.reviews.map(review => {
                    return (
                        <li key={review.id}>
                            <h2>Author: {review.author}</h2>
                            <p>{`"${review.content}"`}</p>
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
