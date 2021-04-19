import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchForm = ({ onSubmit }) => {
    const { search } = useLocation();
    const { q } = queryString.parse(search);
    const [state, setState] = useState({ inputValue: '' });
    // console.log('form', search, q);
    useEffect(() => {
        // console.log('did mount');
        if (q) {
            setState({ inputValue: q });
            document.getElementById('searchInput').value = q;
        }
    }, []);
    const getInputValue = e => {
        setState({ inputValue: e.target.value });
    };
    const submitForm = e => {
        e.preventDefault();
        onSubmit(state.inputValue);
    };

    return (
        <form className="d-flex" onSubmit={submitForm}>
            <input
                type="text"
                autoComplete="off"
                onChange={getInputValue}
                id="searchInput"
                className="form-control me-2"
            />
            <button type="submit" className="btn btn-outline-primary">
                Search
            </button>
        </form>
    );
};

export default SearchForm;

SearchForm.propTypes = {
    submitForm: PropTypes.func,
    getInputValue: PropTypes.func,
    onSubmit: PropTypes.func,
    inputValue: PropTypes.string,
};
