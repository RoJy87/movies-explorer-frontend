import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import { searchFilter } from '../../utils/utils';

export default function Movies({
  loggedIn,
  movies,
  favoriteMovies,
  onSaveMovie,
  onRemoveMovie,
  handleEmptySearch,
  DataErrorMessage,
}) {
  const path = useLocation().pathname;
  const [resultMovies, setResultMovies] = useState(favoriteMovies || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [searchValues, setSearchValues] = useState({ request: '', checkBox: false });

  useEffect(() => {
    if (searchValues.request || path === '/saved-movies') {
      handleSearchMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValues.checkBox]);

  useEffect(() => {
    setSearchValues({ request: '', checkBox: false });
    setIsFound(true);
  }, [path]);

  useEffect(() => {
    setResultMovies(favoriteMovies);
    if (
      (searchValues.request && path === '/saved-movies') ||
      (searchValues.checkBox && path === '/saved-movies')
    ) {
      handleSearchMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteMovies]);

  useEffect(() => {
    if (path === '/movies') {
      const searchRequest = JSON.parse(localStorage.getItem('searchRequest'));
      const searchMovies = JSON.parse(localStorage.getItem('searchMovies'));
      if (searchMovies?.length) {
        setSearchValues(searchRequest);
        setIsFound(!!searchMovies?.length);
        setResultMovies(searchMovies);
      } else {
        setResultMovies([]);
      }
    }
  }, [path]);

  useEffect(() => {
    if (searchValues.request && resultMovies?.length && path === '/movies') {
      localStorage.setItem('searchRequest', JSON.stringify(searchValues));
      localStorage.setItem('searchMovies', JSON.stringify(resultMovies));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultMovies]);

  function handleSearchMovies() {
    setIsLoading(true);
    const results = searchFilter(movies, searchValues);
    setIsFound(results.length);
    setResultMovies(results);
    setIsLoading(false);
  }

  function onSubmit() {
    searchValues.request ? handleSearchMovies(movies) : handleEmptySearch();
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
