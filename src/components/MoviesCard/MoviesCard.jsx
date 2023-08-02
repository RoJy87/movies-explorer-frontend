import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MoviesCard({ movie, handleSaveCard, handleRemoveCard, isFavorite }) {
  const [isCardFavorite, setIsCardFavorite] = useState(isFavorite);
  const path = useLocation().pathname;

  const timeConverter = (minut) => {
    return `${Math.floor(minut / 60)}ч ${minut % 60}м`;
  };

  const handleSave = () => {
    handleSaveCard(movie);
    setIsCardFavorite(true);
  };

  const handleRemove = () => {
    handleRemoveCard(movie);
    setIsCardFavorite(false);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__item">
        <div className="movies-card__container">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__text">{timeConverter(movie.duration)}</p>
        </div>
        {path === '/saved-movies' ? (
          <button
            className="button movies-card__button movies-card__button_type_close"
            onClick={handleRemove}></button>
        ) : isCardFavorite ? (
          <button
            onClick={handleRemove}
            className="button movies-card__button movies-card__button_type_saved"></button>
        ) : (
          <button
            onClick={handleSave}
            className="button movies-card__button movies-card__button_type_normal"></button>
        )}
      </div>
      <Link
        to={movie.trailerLink}
        className="movies-card__img-button link"
        target="_blanck"
        rel="noopener noreferrer">
        <img
          className="movies-card__img"
          src={`https://api.nomoreparties.co/${movie.image.url}`}
          alt={movie.nameRU}
        />
      </Link>
    </li>
  );
}
