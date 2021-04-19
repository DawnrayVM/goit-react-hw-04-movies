import { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
// import { useState } from "react";
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
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
        // console.log(match);
        return (
            <section className={styles.container}>
                <div className={styles.homepageBox}>
                    <button
                        type="button"
                        className={styles.goBackBtn}
                        onClick={this.handleGoBack}
                    >
                        Go back
                    </button>

                    {this.state.isLoading ? (
                        <RingLoader
                            css={override}
                            color="#006950"
                            loading={this.state.isLoading}
                            size="150"
                        />
                    ) : (
                        <>
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
