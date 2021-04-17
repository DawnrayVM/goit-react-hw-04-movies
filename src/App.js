import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import routes from './routes';
import AppBar from './components/AppBar';
import Homepage from './views/Homepage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';

const App = () => {
    return (
        <>
            <AppBar />
            <Switch>
                <Route exact path={routes.home} component={Homepage} />
                <Route exact path={routes.movies} component={MoviesPage} />
                <Route
                    path={routes.movieDetailsPage}
                    component={MovieDetailsPage}
                />
            </Switch>
        </>
    );
};

export default App;
