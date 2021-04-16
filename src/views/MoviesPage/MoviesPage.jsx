import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { searchMovie } from '../../components/services/movie-api';
import SearchForm from '../../components/SearchForm/SearchForm';

class MoviesPage extends Component {
    state = {
        moviesArray: [],
        searchQuery: '',
        error: '',
        currentPage: 0,
        totalPages: 0,
    };

    submitHandler = data => {
        this.setState({ searchQuery: data });
    };

    componentDidUpdate(prevProps, prevState) {
        const { searchQuery } = this.state;
        if (prevState.searchQuery !== searchQuery) {
            searchQuery
                ? searchMovie(searchQuery)
                      .then(({ results, page, total_pages }) =>
                          this.setState({
                              moviesArray: results,
                              currentPage: page,
                              totalPages: total_pages,
                          }),
                      )
                      .catch(error => this.setState({ error: error }))
                : this.setState({
                      moviesArray: [],
                      searchQuery: '',
                      error: '',
                  });
        } else return;
    }
    render() {
        return (
            <section>
                <h2>Search movies</h2>
                <SearchForm onSubmit={this.submitHandler}></SearchForm>
                <ul className="movies-list">
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
                {/* <button type="button">{this.state.currentPage}</button> */}
            </section>
        );
    }
}

export default MoviesPage;
