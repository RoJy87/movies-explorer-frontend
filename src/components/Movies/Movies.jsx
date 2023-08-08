import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import { Suspense, lazy, useState } from 'react';

const MoviesCardList = lazy(() => import('../MoviesCardList/MoviesCardList'));
const SearchForm = lazy(() => import('../SearchForm/SearchForm'));
const FilterCheckbox = lazy(() => import('../FilterCheckbox/FilterCheckbox'));

export default function Movies({
  loggedIn,
  movies,
  isFound,
  onSaveMovie,
  onRemoveMovie,
  onSearchMovies
}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Suspense fallback={<Preloader />}>
        <main className="movies">
          <SearchForm movies={movies} onSearchMovies={onSearchMovies}>
            <FilterCheckbox />
          </SearchForm>
          {isFound ? (
            <MoviesCardList
              movies={movies}
              onSaveMovie={onSaveMovie}
              onRemoveMovie={onRemoveMovie}
            />
          ) : (
            <p className="text-primary">Ничего не найдено!</p>
          )}
        </main>
      </Suspense>
      <Footer />
    </>
  );
}
