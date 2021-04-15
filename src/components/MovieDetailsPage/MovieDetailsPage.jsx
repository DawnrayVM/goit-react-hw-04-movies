import { Component } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';
import axios from 'axios';

class MovieDetailsPage extends Component {
    state = { movieDetails: {}, genres: [] };
    componentDidMount() {
        axios
            .get(
                `
                https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=2d2272085b6a086155bacb1413ae9080`,
            )
            .then(({ data }) => {
                this.setState({ movieDetails: data });
            })
            .then(console.log);

        axios
            .get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=2d2272085b6a086155bacb1413ae9080&language=en-US`,
            )
            .then(({ data: { genres } }) => {
                this.setState({ genres: genres });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <section class="movie-container">
                <h1>
                    Movie Details Page: {this.state.movieDetails.title} (
                    {this.state.movieDetails.release_date})
                </h1>
                <p>User Score: {this.state.movieDetails.vote_average}</p>
                <img
                    src={`https://image.tmdb.org/t/p/w342/${this.state.movieDetails.poster_path}`}
                />
                <h2>Overview:</h2>
                <p>{this.state.movieDetails.overview}</p>
                <h2>Genres:</h2>
                <ul>
                    {this.state.genres.reduce(
                        (acc, genre) =>
                            genre.id === this.state.movieDetails.genres &&
                            acc.push(genre.name),
                    )}
                </ul>
            </section>
        );
    }
}

export default MovieDetailsPage;
