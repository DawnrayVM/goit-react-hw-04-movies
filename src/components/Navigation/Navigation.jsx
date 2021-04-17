import { NavLink } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import routes from '../../routes';

const useStyles = createUseStyles({
    container: {
        padding: '10px 40px',
        backgroundColor: '#2ecc71',
        width: 1200,
        borderRadius: '5px 5px 0 0',
    },
    navList: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none',
    },
    navListItem: {
        marginRight: 15,
        border: '1px solid #006950',
        padding: '5px 15px',
        borderRadius: 5,
    },
    navLink: {
        fontSize: 16,
        color: '#006950',
        textDecoration: 'none',
        '&:hover': { color: '#c7fff2' },
    },
    navLinkActive: {
        color: '#c7fff2',
    },
});

const Navigation = () => {
    const classes = useStyles();
    return (
        <nav className={classes.container}>
            <ul className={classes.navList}>
                <li className={classes.navListItem}>
                    <NavLink
                        exact
                        to={routes.home}
                        className={classes.navLink}
                        activeClassName={classes.navLinkActive}
                    >
                        Home
                    </NavLink>
                </li>
                <li className={classes.navListItem}>
                    <NavLink
                        to={routes.movies}
                        className={classes.navLink}
                        activeClassName={classes.navLinkActive}
                    >
                        Movies
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
