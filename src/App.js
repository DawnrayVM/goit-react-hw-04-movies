import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import MoviesPage from './components/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage';
import Cast from './components/Cast';
import Reviews from './components/Reviews';
import HomeView from './views/HomeView';
import Movies from './views/Movies';

const App = () => {
    return (
        <>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/movies">Movies</NavLink>
                </li>
                <li>
                    <NavLink to="/movies/:id">Movie</NavLink>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={HomeView} />
                <Route exact path="/movies" component={MoviesPage} />
                <Route path="/movies/:movieId" component={MovieDetailsPage} />
            </Switch>
        </>
    );
};

export default App;
