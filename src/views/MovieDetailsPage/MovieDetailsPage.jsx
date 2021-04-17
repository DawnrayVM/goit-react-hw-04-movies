import { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/services/movie-api';
import styles from './styles.module.css';
import Reviews from '../Reviews';
import Cast from '../Cast';

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
        const { match } = this.props;
        return (
            <section className={styles.container}>
                <div className={styles.homepageBox}>
                    <button type="button" className={styles.goBackBtn}>
                        Go back
                    </button>
                    <div className={styles.movieDetails}>
                        <img src={poster} />
                        <div>
                            <h1>
                                {title} ({release_date})
                            </h1>
                            <p>User Score: {vote_average}</p>
                            <h2>Overview:</h2>
                            <p>{overview}</p>
                            <h2>Genres:</h2>
                            <p>{genres}</p>
                            <h3>Additional information</h3>
                            <ul className="movie-more-info">
                                <li>
                                    <NavLink to={`${match.url}/cast/`}>
                                        Cast
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`${match.url}/reviews/`}>
                                        Reviews
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Switch>
                        <Route
                            path={`${match.path}/reviews`}
                            component={Reviews}
                        />
                        <Route path={`${match.path}/cast`} component={Cast} />
                    </Switch>
                </div>
            </section>
        );
    }
}

export default MovieDetailsPage;
