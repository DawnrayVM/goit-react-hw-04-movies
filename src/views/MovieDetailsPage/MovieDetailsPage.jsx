import { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
import PropTypes from 'prop-types';
import { fetchMovieDetails } from '../../components/services/movie-api';
import styles from './styles.module.css';
import Reviews from '../Reviews';
import Cast from '../Cast';
import routes from '../../routes';

const override = css`
    display: block;
    margin: 0 auto;
`;

class MovieDetailsPage extends Component {
    static propTypes = {
        match: PropTypes.shape({
            isExact: PropTypes.bool,
            params: PropTypes.shape({ movieId: PropTypes.string }),
            path: PropTypes.string,
            url: PropTypes.string,
        }),
        history: PropTypes.object,
        location: PropTypes.shape({
            state: PropTypes.shape({
                from: PropTypes.object,
                query: PropTypes.string,
            }),
        }),
    };

    state = { movieDetails: {}, genres: [], isLoading: false };
    componentDidMount() {
        this.setState({ isLoading: true });
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
                        isLoading: false,
                    });
                },
            )
            .catch(error => console.log(error));
    }
    handleGoBack = () => {
        const { history, location } = this.props;
        history.push(location?.state?.from || routes.movies);
    };
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
                <div className="container">
                    <button
                        type="button"
                        className={`btn btn-outline-primary ${styles.goBackBtn}`}
                        onClick={this.handleGoBack}
                    >
                        Go back
                    </button>
                    {this.state.isLoading ? (
                        <RingLoader
                            css={override}
                            color="#0d6efd"
                            loading={this.state.isLoading}
                            size="150px"
                        />
                    ) : (
                        <>
                            <div className={styles.movieDetails}>
                                <img src={poster} alt={title} />
                                <div className={styles.movieDetailsContainer}>
                                    <h1>
                                        {title} ({release_date})
                                    </h1>
                                    <p className={styles.movieDetailsPageTitle}>
                                        IMDB Rate: {vote_average}
                                    </p>
                                    <h2>Overview:</h2>
                                    <p>{overview}</p>
                                    <h2>Genres:</h2>
                                    <p>{genres}</p>
                                    <h3>Additional information</h3>
                                    <ul className={styles.movieMoreInfo}>
                                        <li
                                            className={styles.movieMoreInfoItem}
                                        >
                                            <NavLink
                                                to={{
                                                    pathname: `${match.url}/cast/`,
                                                    state: {
                                                        from: this.props
                                                            .location,
                                                        query: this.props
                                                            .location.state
                                                            .query,
                                                    },
                                                }}
                                                className="btn btn-primary"
                                            >
                                                Cast
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={{
                                                    pathname: `${match.url}/reviews/`,
                                                    state: {
                                                        from: this.props
                                                            .location,
                                                        query: this.props
                                                            .location.state
                                                            .query,
                                                    },
                                                }}
                                                className="btn btn-primary"
                                            >
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
                                <Route
                                    path={`${match.path}/cast`}
                                    component={Cast}
                                />
                            </Switch>
                        </>
                    )}
                </div>
            </section>
        );
    }
}

export default MovieDetailsPage;
