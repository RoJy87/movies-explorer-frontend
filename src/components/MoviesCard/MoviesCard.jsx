import { Link, useLocation } from 'react-router-dom';
import { timeConverter } from '../../utils/utils';
import { useState } from 'react';

export default function MoviesCard({ movie, onSaveMovie, onRemoveMovie, isFavorites }) {
  const [isFavorite, setIsFavorite] = useState(isFavorites);
  const path = useLocation().pathname;

  const handleSave = () => {
    onSaveMovie(movie);
    setIsFavorite(true);
  };

  const handleRemove = () => {
    onRemoveMovie(movie);
    setIsFavorite(false);
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
        ) : isFavorite ? (
          <button
            onClick={handleRemove}
            className="button movies-card__button movies-card__button_type_saved"></button>
        ) : (
          <button
            onClick={handleSave}
            className="button movies-card__button movies-card__button_type_normal"></button>
        )}
      </div>
      <Link to={movie.trailerLink} className="movies-card__img-button link" target="_blanck">
        <img className="movies-card__img" src={movie.image} alt={movie.nameRU} />
      </Link>
    </li>
  );
}
