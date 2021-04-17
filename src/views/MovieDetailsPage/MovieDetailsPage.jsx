import { Component } from 'react';
import axios from 'axios';
import { NavLink, Route, Switch } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/services/movie-api';

class MovieDetailsPage extends Component {
    state = { movieDetails: {}, genres: [] };
    componentDidMount() {
        fetchMovieDetails(this.props.match.params.movieId)
            .then(
                ({
                    data: {
                        id,
                        title,
                        release_date,
                        vote_average,
                        poster_path,
                        overview,
                        genres,
                    },
                }) => {
                    this.setState({
                        movieDetails: {
                            id,
                            title,
                            release_date: release_date.slice(0, 4),
                            vote_average,
                            poster: `https://image.tmdb.org/t/p/w342/${poster_path}`,
                            overview,
                            genres: genres
                                .map(genre => {
                                    return genre.name;
                                })
                                .join(', '),
                        },
                    });
                },
            )
            .catch(error => console.log(error));
    }

    render() {
        const {
            title,
            release_date,
            vote_average,
            poster,
            overview,
            genres,
        } = this.state.movieDetails;
        const { url } = this.props.match;
        return (
            <section className="movie-container">
                <button type="button">Go back</button>
                <h1>
                    Movie Details Page: {title} ({release_date})
                </h1>
                <p>User Score: {vote_average}</p>
                <img src={poster} />
                <h2>Overview:</h2>
                <p>{overview}</p>
                <h2>Genres:</h2>
                <p>{genres}</p>
                <h3>Additional information</h3>
                <ul className="movie-more-info">
                    <li>
                        <NavLink to={`${url}/cast/`}>Cast</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}/reviews/`}>Reviews</NavLink>
                    </li>
                </ul>
            </section>
        );
    }
}

export default MovieDetailsPage;
