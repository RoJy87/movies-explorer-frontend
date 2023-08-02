import React, { useContext, useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { windowSizes, cardsNumber, cardsAddNumber } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MoviesCardList({ movies, handleSaveCard, handleRemoveCard }) {
  const currentUser = useContext(CurrentUserContext);
  const path = useLocation().pathname;
  const [cardsForShow, setCardsForShow] = useState([]);
  const [cardsOnPage, setCardsOnPage] = useState(0);
  const [moreCardsOnPage, setMoreCardsOnPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);

    if (windowWidth > windowSizes.pc) {
      setCardsOnPage(cardsNumber.pc);
      setMoreCardsOnPage(cardsAddNumber.pc);
    } else if (windowWidth < windowSizes.pc && windowWidth > windowSizes.mobile) {
      setCardsOnPage(cardsNumber.tablet);
      setMoreCardsOnPage(cardsAddNumber.tablet);
    } else if (windowWidth < windowSizes.mobile) {
      setCardsOnPage(cardsNumber.mobile);
      setMoreCardsOnPage(cardsAddNumber.mobile);
    }

    return () => window.removeEventListener('resize', resizeWindow);
  }, [windowWidth]);

  useEffect(() => {
    path === '/movies' ? setCardsForShow(movies?.slice(0, cardsOnPage)) : setCardsForShow(movies);
  }, [cardsOnPage, movies, path]);

  const onAddCard = () => {
    setCardsForShow(movies.slice(0, cardsForShow.length + moreCardsOnPage));
  };

  return (
    <section className="movies-cards" aria-label="Трейлеры фильмов">
      <ul className="movies-cards__list">
        {cardsForShow?.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={Math.random() + Date.now()}
              handleSaveCard={handleSaveCard}
              handleRemoveCard={handleRemoveCard}
              isFavorite={JSON.parse(
                localStorage.getItem('favorites')?.includes(String(movie.id)) || null
              )}
            />
          );
        }) || []}
      </ul>
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
