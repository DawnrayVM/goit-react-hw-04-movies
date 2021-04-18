import React, { Suspense, lazy } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
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

const App = () => {
    return (
        <>
            <AppBar />
            <Suspense fallback={<h1>Loading pages</h1>}>
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
