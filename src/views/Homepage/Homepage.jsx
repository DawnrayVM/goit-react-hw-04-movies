import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchTrending } from '../../components/services/movie-api';

class Homepage extends Component {
    state = {
        moviesArray: [],
        currentPage: 1,
        totalPages: 0,
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
            <div className="homepage">
                <button type="button">Go back</button>
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
            </div>
        );
    }
}

export default Homepage;
