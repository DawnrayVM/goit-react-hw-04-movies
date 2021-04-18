import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchTrending } from '../../components/services/movie-api';
import styles from './styles.module.css';

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
            <section className={styles.container}>
                <div className={styles.homepageBox}>
                    <h2>Trending today</h2>
                    <ul className={styles.homepageList}>
                        {this.state.moviesArray.map(movie => {
                            return (
                                <li
                                    key={movie.id}
                                    className={styles.homepageListItem}
                                >
                                    <NavLink
                                        to={{
                                            pathname: `movies/${movie.id}`,
                                            // state: {
                                            //     from: this.props.location,
                                            // },
                                        }}
                                        className={styles.homepageLink}
                                    >
                                        {movie.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        );
    }
}

export default Homepage;
