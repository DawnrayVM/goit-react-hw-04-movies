import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'react-router-dom';

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
        <form className="search-form" onSubmit={submitForm}>
            <input
                type="text"
                autoComplete="off"
                onChange={getInputValue}
                id="searchInput"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
