import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { windowSizes, moviesQty, moviesQtyToAdd } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({ movies, onSaveMovie, onRemoveMovie }) {
  const path = useLocation().pathname;
  const [moviesForShow, setMoviesForShow] = useState([]);
  const [moviesQtyOnPage, setMoviesQtyOnPage] = useState(0);
  const [moviesQtyNext, setMoviesQtyNext] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeWindow = () => {
    setTimeout(() => setWindowWidth(window.innerWidth), 500);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);

    if (windowWidth > windowSizes.pc) {
      setMoviesQtyOnPage(moviesQty.pc);
      setMoviesQtyNext(moviesQtyToAdd.pc);
    } else if (windowWidth < windowSizes.pc && windowWidth > windowSizes.mobile) {
      setMoviesQtyOnPage(moviesQty.tablet);
      setMoviesQtyNext(moviesQtyToAdd.tablet);
    } else if (windowWidth < windowSizes.mobile) {
      setMoviesQtyOnPage(moviesQty.mobile);
      setMoviesQtyNext(moviesQtyToAdd.mobile);
    }

    return () => window.removeEventListener('resize', resizeWindow);
  }, [windowWidth]);

  useEffect(() => {
    path === '/movies'
      ? setMoviesForShow(movies.slice(0, moviesQtyOnPage))
      : setMoviesForShow(movies);
  }, [moviesQtyOnPage, movies, path]);

  const onAddMovies = () => {
    setMoviesForShow(movies.slice(0, moviesForShow.length + moviesQtyNext));
  };

  return (
    <section className="movies-cards" aria-label="Трейлеры фильмов">
      <ul className="movies-cards__list">
        {moviesForShow.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={Math.random() + Date.now()}
              onSaveMovie={onSaveMovie}
              onRemoveMovie={onRemoveMovie}
              // isFavorite={localStorage.getItem('favorites').includes(movie.id)}
            />
          );
        })}
      </ul>

      {
        <button
          onClick={onAddMovies}
          className={`button movies-cards__button ${
            movies <= moviesForShow && 'movies-cards__button_hidden'
          }`}>
          Ещё
        </button>
      }
    </section>
  );
}
