import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

export default function Movies({
  loggedIn,
  isLoading,
  movies,
  isFound,
  onSaveMovie,
  onRemoveMovie,
  onSearchMovies,
  onHandleCheckShorts,
  isChecked,
  setSearchText,
  searchText,
}) {
  const path = useLocation().pathname;
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          movies={movies}
          onSearchMovies={onSearchMovies}
          setSearchText={setSearchText}
          searchText={searchText}>
          <FilterCheckbox
            onHandleCheckShorts={() => onHandleCheckShorts(movies)}
            isChecked={isChecked}
          />
        </SearchForm>
        {!isLoading ? (
          isFound ? (
            <MoviesCardList
              movies={movies}
              onSaveMovie={onSaveMovie}
              onRemoveMovie={onRemoveMovie}
            />
          ) : path === '/saved-movies' ? (
            <p className="text-primary">Вы ничего не добавили в избранное!</p>
          ) : (
            <p className="text-primary">Ничего не найдено!</p>
          )
        ) : (
          <Preloader />
        )}
      </main>
      <Footer />
    </>
  );
}
