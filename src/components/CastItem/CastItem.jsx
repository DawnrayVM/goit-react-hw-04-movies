import { useState, useEffect } from 'react';

const CastItem = ({ data }) => {
    // console.log(data);
    const filteredData = data
        .filter(({ order }) => order <= 10)
        .map(({ name, profile_path, character }) => ({
            name,
            profile_path: 'https://image.tmdb.org/t/p/w185' + profile_path,
            character,
        }));
    console.log(filteredData);
    return (
        <li key={filteredData.name}>
            <img src={filteredData.profile_path} />
            <h3>{filteredData.name}</h3>
            <p>{filteredData.character}</p>
        </li>
    );
};

export default CastItem;
