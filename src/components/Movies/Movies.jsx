import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import { searchFilter } from '../../utils/utils';

export default function Movies({
  loggedIn,
  movies,
  onSaveMovie,
  onRemoveMovie,
  handleEmptySearch,
  DataErrorMessage,
}) {
  const path = useLocation().pathname;
  const [resultMovies, setResultMovies] = useState(movies || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [searchValues, setSearchValues] = useState({ request: '', checkBox: false });

  useEffect(() => {
    if (path === '/saved-movies') {
      setSearchValues({ request: '', checkBox: false });
    }
  }, [path]);

  useEffect(() => {
    if (path === '/movies') {
      setSearchValues(
        JSON.parse(localStorage.getItem('searchRequest')) || { request: '', checkBox: false }
      );
      setResultMovies(JSON.parse(localStorage.getItem('searchMovies')) || []);
    }
  }, [path]);

  useEffect(() => {
    if (searchValues.request || path === '/saved-movies') {
      handleSearchMovies();
    }
  }, [searchValues.checkBox]);

  useEffect(() => {
    if ((searchValues.request && path === '/movies') || path === '/saved-movies') {
      handleSearchMovies();
    }
  }, [path, movies]);

  function handleSearchMovies() {
    setIsLoading(true);
    const results = searchFilter(movies, searchValues);
    if (path === '/movies') {
      localStorage.setItem('searchRequest', JSON.stringify(searchValues));
      localStorage.setItem('searchMovies', JSON.stringify(results));
    }
    setIsFound(!!results.length);
    setResultMovies(results);
    setTimeout(() => setIsLoading(false), 1000);
  }

  function onSubmit() {
    searchValues.request ? handleSearchMovies() : handleEmptySearch();
  }

  const handleCheckShorts = (e) => {
    setSearchValues({ ...searchValues, checkBox: e.target.checked });
  };

  const handleChangeValue = (value) => {
    setSearchValues({ ...searchValues, request: value });
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSubmit={onSubmit}
          onChange={handleChangeValue}
          searchValue={searchValues.request}>
          <FilterCheckbox
            onHandleCheckShorts={handleCheckShorts}
            isChecked={searchValues.checkBox}
          />
        </SearchForm>
        {DataErrorMessage ? (
          <p className="text-primary">{DataErrorMessage}</p>
        ) : !isLoading ? (
          isFound ? (
            <MoviesCardList
              movies={resultMovies}
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
