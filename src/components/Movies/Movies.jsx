import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { Suspense, lazy } from 'react';

export default function Movies({ loggedIn, movies, handleSaveCard, handleRemoveCard }) {
  const MoviesCardList = lazy(() => import('../MoviesCardList/MoviesCardList'));
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm>
          <FilterCheckbox />
        </SearchForm>
        <Suspense fallback={<Preloader />}>
          <MoviesCardList
            movies={movies}
            handleSaveCard={handleSaveCard}
            handleRemoveCard={handleRemoveCard}
          />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
