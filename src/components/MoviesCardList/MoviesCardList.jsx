import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { WINDOW_SIZES, MOVIES_QTY, MOVIES_QTY_TO_ADD } from '../../utils/constants';
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

    if (windowWidth > WINDOW_SIZES.pc) {
      setMoviesQtyOnPage(MOVIES_QTY.pc);
      setMoviesQtyNext(MOVIES_QTY_TO_ADD.pc);
    } else if (windowWidth <= WINDOW_SIZES.pc && windowWidth >= WINDOW_SIZES.mobile) {
      setMoviesQtyOnPage(MOVIES_QTY.tablet);
      setMoviesQtyNext(MOVIES_QTY_TO_ADD.tablet);
    } else if (windowWidth < WINDOW_SIZES.mobile) {
      setMoviesQtyOnPage(MOVIES_QTY.mobile);
      setMoviesQtyNext(MOVIES_QTY_TO_ADD.mobile);
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
              key={movie.movieId}
              onSaveMovie={onSaveMovie}
              onRemoveMovie={onRemoveMovie}
              isFavorite={JSON.parse(localStorage.getItem('favorites'))?.includes(movie.movieId)}
            />
          );
        })}
      </ul>

      {path === '/movies' && (
        <button
          onClick={onAddMovies}
          className={`button movies-cards__button ${
            movies <= moviesForShow && 'movies-cards__button_hidden'
          }`}>
          Ещё
        </button>
      )}
    </section>
  );
}
