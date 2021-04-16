import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <ul>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/movies">Movies</NavLink>
        </li>
        {/* <li>
            <NavLink to="/movies/:id">Movie</NavLink>
        </li> */}
    </ul>
);

export default Navigation;
