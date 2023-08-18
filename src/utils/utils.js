import { useEffect } from 'react';
import { EMAIL, MOVIES_API_BASE, NAME, PASSWORD, SHORTS_DURATION } from './constants';

export const moviesHandler = (movies) => {
  return movies.map((movie) => {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIES_API_BASE + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIES_API_BASE + movie.image.formats.thumbnail.url || '',
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN || '',
    };
  });
};

export const searchFilter = (data, searchValues) => {
  const movies = data.filter((movie) => {
    if (searchValues.checkBox) {
      return (
        (movie.nameRU?.toLowerCase().includes(searchValues.request) ||
          movie.nameEN?.toLowerCase().includes(searchValues.request)) &&
        movie.duration <= SHORTS_DURATION
      );
    } else {
      return (
        movie.nameRU?.toLowerCase().includes(searchValues.request) ||
        movie.nameEN?.toLowerCase().includes(searchValues.request)
      );
    }
  });
  return movies;
};

export function ClosePopupOnEscape({ action }) {
  useEffect(() => {
    function handleEscClose(evt) {
      evt.key === 'Escape' && action();
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  });
}

export function checkPattern(value, name) {
  let patternName;
  if (name === 'name') {
    patternName = NAME;
  }
  if (name === 'email') {
    patternName = EMAIL;
  }
  if (name === 'password') {
    patternName = PASSWORD;
  }
  const pattern = new RegExp(patternName);
  const valid = pattern.test(value);
  return valid;
}

export const timeConverter = (minut) => {
  return minut < 60 ? `${minut}м` : `${Math.floor(minut / 60)}ч ${minut % 60}м`;
};
