import { createUseStyles } from 'react-jss';
import Navigation from '../Navigation';

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
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
