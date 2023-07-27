import React, { useState } from "react";
import saved__icon from "../../images/saved_icon.svg";
import saved__icon_active from "../../images/saved__icon_active.svg";
import close_icon from "../../images/close_icon.svg";
import { Link, useLocation } from "react-router-dom";

export default function MoviesCard({ movie }) {
  const path = useLocation().pathname;

  const [iconActive, setIconActive] = useState(false);

  const timeConverter = (minut) => {
    return `${Math.floor(minut / 60)}ч ${minut % 60}м`;
  };

  const onChageIcon = () => {
    setIconActive(!iconActive);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__item">
        <div className="movies-card__container">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__text">{timeConverter(movie.duration)}</p>
        </div>
        {path === "/movies" && (
          <button
            className="movies-card__save-button button"
            onClick={onChageIcon}
          >
            <img
              className="movies-card__icon"
              src={iconActive ? saved__icon_active : saved__icon}
              alt="Иконка сохранения"
            />
          </button>
        )}
        {path === "/saved-movies" && (
          <button
            className="movies-card__save-button button"
            onClick={onChageIcon}
          >
            <img
              className="movies-card__icon"
              src={close_icon}
              alt="Иконка сохранения"
            />
          </button>
        )}
      </div>
      <Link
        to={movie.trailerLink}
        className="movies-card__img-button link"
        target="_blanck"
        rel="noopener noreferrer"
      >
        <img
          className="movies-card__img"
          src={`https://api.nomoreparties.co/${movie.image.url}`}
          alt={movie.nameRU}
        />
      </Link>
      {/* <iframe
        src={movie.trailerLink}
        title={movie.nameRU}
        allowfullscreen
        class="video__iframe"
      ></iframe> */}
    </li>
  );
}
