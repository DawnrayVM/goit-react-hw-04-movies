import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from '../../routes';

const Navigation = () => {
    return (
        <nav className="container navbar navbar-expand-lg navbar-light bg-light">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <NavLink
                        exact
                        to={routes.home}
                        className="nav-link"
                        activeClassName="nav-link active"
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to={routes.movies}
                        className="nav-link"
                        activeClassName="nav-link active"
                    >
                        Movies
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
