import { NavLink } from 'react-router-dom';
import { useCreateStyles, createUseStyles } from 'react-jss';
import Navigation from '../Navigation';

const useStyles = createUseStyles({
    container: {
        // margin: { top: 10 },
        // backgroundColor: '#2ecc71',
        // borderBottom: '1px solid tomato',
        display: 'flex',
        justifyContent: 'center',
        // flexDirection: 'row',
    },
});

const AppBar = () => {
    const classes = useStyles();
    return (
        <header className={classes.container}>
            <Navigation />
        </header>
    );
};

export default AppBar;
