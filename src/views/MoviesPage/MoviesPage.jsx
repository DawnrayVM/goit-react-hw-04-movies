import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { searchMovie } from '../../components/services/movie-api';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './styles.module.css';

class MoviesPage extends Component {
    static propTypes = {
        match: PropTypes.shape({
            isExact: PropTypes.bool,
            params: PropTypes.object,
            path: PropTypes.string,
            url: PropTypes.string,
        }),
        history: PropTypes.object,
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
    };
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

    componentDidMount() {
        const lastQuery = this.props.location.search;
        const { q } = queryString.parse(lastQuery);
        this.setState({ searchQuery: q });
    }

    componentDidUpdate(prevProps, prevState) {
        const { searchQuery } = this.state;
        if (prevState.searchQuery !== searchQuery) {
            searchQuery
                ? searchMovie(searchQuery)
                      .then(
                          ({ results, page, total_pages }) =>
                              this.setState({
                                  moviesArray: results,
                                  currentPage: page,
                                  totalPages: total_pages,
                              }),
                          (this.props.location.search = `q=${searchQuery}`),
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
            <section className={styles.container}>
                <div className="container">
                    <h2 className={styles.moviePageTitle}>Search movies</h2>
                    <SearchForm onSubmit={this.submitHandler}></SearchForm>
                    <ul className={styles.homepageList}>
                        {this.state.moviesArray.map(movie => {
                            return (
                                <li
                                    key={movie.id}
                                    className={styles.homepageListItem}
                                >
                                    <NavLink
                                        to={{
                                            pathname: `${this.props.match.url}/${movie.id}`,
                                            state: {
                                                from: this.props.location,
                                                query: this.state.searchQuery,
                                            },
                                        }}
                                        className={styles.homepageLink}
                                    >
                                        {movie.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    {/* <button type="button">{this.state.currentPage}</button> */}
                </div>
            </section>
        );
    }
}

export default MoviesPage;
