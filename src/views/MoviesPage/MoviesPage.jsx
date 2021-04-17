import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { searchMovie } from '../../components/services/movie-api';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './styles.module.css';

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
            <section className={styles.container}>
                <div className={styles.homepageBox}>
                    <h2>Search movies</h2>
                    <SearchForm onSubmit={this.submitHandler}></SearchForm>
                    <ul className={styles.homepageList}>
                        {this.state.moviesArray.map(movie => {
                            return (
                                <li
                                    key={movie.id}
                                    className={styles.homepageListItem}
                                >
                                    <NavLink
                                        to={`${this.props.match.url}/${movie.id}`}
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
