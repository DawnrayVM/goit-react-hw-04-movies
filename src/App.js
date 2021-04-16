import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Navigation from './views/Navigation';
import Homepage from './views/Homepage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import Cast from './views/Cast';
import Reviews from './views/Reviews';
import SearchForm from './components/SearchForm/SearchForm';

const App = () => {
    return (
        <>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/movies" component={MoviesPage} />

                <Route path="/movies/:movieId" component={MovieDetailsPage} />
            </Switch>
            <Switch>
                <Route path="/movies/:movieId/reviews" component={Reviews} />
                <Route path="/movies/:movieId/cast" component={Cast} />
            </Switch>
        </>
    );
};

export default App;
