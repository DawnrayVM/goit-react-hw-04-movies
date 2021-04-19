import { createUseStyles } from 'react-jss';
import Navigation from '../Navigation';

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
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
