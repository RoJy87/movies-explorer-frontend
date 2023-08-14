import { MOVIES_API_BASE, SHORTS_DURATION } from './constants';

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
  return data.filter((movie) => {
    if (searchValues.checkBox) {
      return (
        (movie.nameRU.toLowerCase().includes(searchValues.request) ||
          movie.nameEN.toLowerCase().includes(searchValues.request)) &&
        movie.duration <= SHORTS_DURATION
      );
    } else {
      return (
        movie.nameRU.toLowerCase().includes(searchValues.request) ||
        movie.nameEN.toLowerCase().includes(searchValues.request)
      );
    }
  });
};

export const timeConverter = (minut) => {
  return minut < 60 ? `${minut}м` : `${Math.floor(minut / 60)}ч ${minut % 60}м`;
};