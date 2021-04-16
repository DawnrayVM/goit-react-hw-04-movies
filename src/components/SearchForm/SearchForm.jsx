import { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { history } from 'react-router-dom';

const SearchForm = ({ onSubmit }) => {
    const [state, setState] = useState({ inputValue: '' });
    const getInputValue = e => {
        setState({ inputValue: e.target.value });
    };
    const submitForm = e => {
        e.preventDefault();
        onSubmit(state.inputValue);

        // setState({ inputValue: '' });
        // document.getElementById('searchInput').value = '';
    };

    return (
        <form className="search-form" onSubmit={submitForm}>
            <input type="text" onChange={getInputValue} id="searchInput" />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
