import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        const { moviesArray } = this.state;
        return (
            <section className={styles.container}>
                <div className="container">
                    <h2 className={styles.homepageTitle}>Trending today</h2>
                    <ul className={styles.homepageList}>
                        {moviesArray.map(({ id, title }) => {
                            return (
                                <li
                                    key={id}
                                    className={styles.homepageListItem}
                                >
                                    <NavLink
                                        to={{
                                            pathname: `movies/${id}`,
                                            state: {
                                                from: this.props.location,
                                            },
                                        }}
                                        className={styles.homepageLink}
                                    >
                                        {title}
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

Homepage.proptype = {
    id: PropTypes.number,
    title: PropTypes.string,
};
