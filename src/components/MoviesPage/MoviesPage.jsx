import { useCreateStyles } from 'react-jss';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchTrending } from '../services/movie-api';

class MoviesPage extends Component {
    state = {
        moviesArray: [],
        currentPage: 1,
        error: '',
    };
    componentDidMount() {
        fetchTrending()
            .then(({ page, results }) => {
                this.setState({
                    moviesArray: [...results],
                    currentPage: page,
                });
            })
            .catch(error => this.setState({ error: error }));
    }
    render() {
        return (
            <div className="Movies-page">
                <h2>Trending movies</h2>
                <ul>
                    {this.state.moviesArray.map(movie => {
                        return (
                            <NavLink
                                to={`${this.props.match.url}/${movie.id}`}
                                key={movie.id}
                            >
                                <li>{movie.title}</li>
                            </NavLink>
                        );
                    })}
                </ul>
                <button type="button">{this.state.currentPage}</button>
            </div>
        );
    }
}

export default MoviesPage;
