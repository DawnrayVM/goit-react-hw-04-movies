import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
import routes from './routes';
import AppBar from './components/AppBar';

const Homepage = lazy(() =>
    import('./views/Homepage' /* webpackChunkName: "homepage" */),
);
const MoviesPage = lazy(() =>
    import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
    import(
        './views/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
    ),
);

const override = css`
    display: block;
    margin: 50px auto;
`;

const App = () => {
    return (
        <>
            <AppBar />
            <Suspense
                fallback={
                    <RingLoader css={override} color="#0d6efd" size="150px" />
                }
            >
                <Switch>
                    <Route exact path={routes.home} component={Homepage} />
                    <Route exact path={routes.movies} component={MoviesPage} />
                    <Route
                        path={routes.movieDetailsPage}
                        component={MovieDetailsPage}
                    />
                </Switch>
            </Suspense>
        </>
    );
};

export default App;
