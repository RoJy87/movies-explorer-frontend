import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies }) {
  console.log(movies);
  return (
    <section className="movies" aria-label="Трейлеры фильмов">
      <ul className="movies__list">
        {movies.map((movie) => {
          return <MoviesCard movie={movie} key={movie.id} />;
        })}
        <button className="movies__button">Ещё</button>
      </ul>
    </section>
  );
}
