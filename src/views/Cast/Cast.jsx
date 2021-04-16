import { useState, useEffect, useLayoutEffect } from 'react';
import { useCreateStyles } from 'react-jss';
import { fetchCast } from '../../components/services/movie-api';

const Cast = ({ match }) => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log('mount');
        fetchCast(match.params.movieId).then(({ cast }) => {
            setState({ cast: cast });
        });
    }, []);
    console.log(state);
    return (
        <section className="cast-container">
            {/* {state.cast.length > 0
                ? state.cast.map(({ name, character, profile_path, order }) => {
                      if (order <= 10) {
                          return (
                              <li key={name}>
                                  <img
                                      src={`http://image.tmdb.org/t/p/w185${profile_path}`}
                                  />
                                  <h3>{name}</h3>
                                  <p>{character}</p>
                              </li>
                          );
                      }
                  })
                : null} */}
            //*нужно создать тупой компонент и передать данные стейта для
            разметки *//
        </section>
    );
};

export default Cast;
