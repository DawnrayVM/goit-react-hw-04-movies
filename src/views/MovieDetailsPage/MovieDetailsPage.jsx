import { Component } from 'react';
import axios from 'axios';
import { NavLink, Route, Switch } from 'react-router-dom';

class MovieDetailsPage extends Component {
    state = { movieDetails: {}, genres: [] };
    componentDidMount() {
        axios
            .get(
                `
                https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=2d2272085b6a086155bacb1413ae9080`,
            )
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
                <h2>Genres: {genres}</h2>
                <p>Additional information</p>
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
