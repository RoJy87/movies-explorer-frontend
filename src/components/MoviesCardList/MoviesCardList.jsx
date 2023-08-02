import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { windowSizes, cardsQty, cardsQtyToAdd } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({ movies, handleSaveCard, handleRemoveCard }) {
  const path = useLocation().pathname;
  const [cardsForShow, setCardsForShow] = useState([]);
  const [cardsQtyOnPage, setCardsQtyOnPage] = useState(0);
  const [CardsQtyNext, setCardsQtyNext] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);

    if (windowWidth > windowSizes.pc) {
      setCardsQtyOnPage(cardsQty.pc);
      setCardsQtyNext(cardsQtyToAdd.pc);
    } else if (windowWidth < windowSizes.pc && windowWidth > windowSizes.mobile) {
      setCardsQtyOnPage(cardsQty.tablet);
      setCardsQtyNext(cardsQtyToAdd.tablet);
    } else if (windowWidth < windowSizes.mobile) {
      setCardsQtyOnPage(cardsQty.mobile);
      setCardsQtyNext(cardsQtyToAdd.mobile);
    }

    return () => window.removeEventListener('resize', resizeWindow);
  }, [windowWidth]);

  useEffect(() => {
    path === '/movies'
      ? setCardsForShow(movies?.slice(0, cardsQtyOnPage))
      : setCardsForShow(movies);
  }, [cardsQtyOnPage, movies, path]);

  const onAddCard = () => {
    setCardsForShow(movies.slice(0, cardsForShow.length + CardsQtyNext));
  };

  return (
    <section className="movies-cards" aria-label="Трейлеры фильмов">
      {movies.length ? (
        <ul className="movies-cards__list">
          {cardsForShow.map((movie) => {
            return (
              <MoviesCard
                movie={movie}
                key={Math.random() + Date.now()}
                handleSaveCard={handleSaveCard}
                handleRemoveCard={handleRemoveCard}
                isFavorite={JSON.parse(
                  localStorage.getItem('favorites').includes(String(movie.id))
                )}
              />
            );
          })}
        </ul>
      ) : (
        <p className="text_primary">Ничего не найдено!</p>
      )}
      {
        <button
          onClick={onAddCard}
          className={`button movies-cards__button ${
            movies <= cardsForShow && 'movies-cards__button_hidden'
          }`}>
          Ещё
        </button>
      }
    </section>
  );
}
