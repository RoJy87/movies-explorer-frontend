import { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { moviesApi } from '../../utils/MoviesApi';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { auth } from '../../utils/Auth';
import { CREATE_USER_ERROR_CODE } from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';
import { moviesHandler, searchFilter } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';

// const Movies = lazy(() => import('../Movies/Movies'));

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(Boolean);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [movies, setMovies] = useState([]);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [isInputActive, setIsInputActive] = useState(true);
  const [isButton, setIsButton] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();
  const path = useLocation().pathname;

  // User

  const checkToken = useCallback(() => {
    auth
      .getAuthInfo()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch(({ err, message }) => console.log(message));
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getItems(), moviesApi.getItems()])
        .then(([favoritesMovies, movies]) => {
          const structuredMovies = moviesHandler(movies);
          setMovies(structuredMovies);
          if (favoritesMovies) {
            const userFavorites = favoritesMovies.filter(
              (movie) => movie.owner === currentUser._id
            );
            setFavoriteMovies(userFavorites);
            const favoritesId = userFavorites.map((movie) => movie.movieId);
            localStorage.setItem('favorites', JSON.stringify(favoritesId));
          }
        })
        .catch(({ err, message }) => console.log(message));
    }
  }, [loggedIn, currentUser._id]);

  function handleLogin(values, setValues) {
    setIsLoadingButton(true);
    if (!values.password || !values.email) {
      return;
    }
    const { email, password } = values;
    auth
      .authorize(email, password)
      .then((userData) => {
        const { name, email } = userData;
        setCurrentUser({ name, email });
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch(({ err, message }) => {
        setTooltipMessage('Неправильный логин или пароль'); //TODO либо другая ошибка
        setSuccessful(false);
        setInfoTooltipPopupOpen(true);
        console.log(message);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  function handleLogout() {
    auth.logout();
    setLoggedIn(false);
    localStorage.clear();
    navigate('/signin', { replace: true });
  }

  const handleRegister = (values) => {
    setIsLoadingButton(true);
    const { name, email, password } = values;
    auth
      .register(name, email, password)
      .then(() => {
        setSuccessful(true);
        setTooltipMessage('Регистрация прошла успешно');
        setInfoTooltipPopupOpen(true);
        navigate('/signin', { replace: true });
      })
      .catch(({ err, message }) => {
        console.log(message);
        err.status === CREATE_USER_ERROR_CODE
          ? setTooltipMessage('E-mail занят')
          : setTooltipMessage('Что-то пошло не так');
        setSuccessful(false);
        setInfoTooltipPopupOpen(true);
      })
      .finally(() => setIsLoadingButton(false));
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsInputActive(false);
    setIsButton(true);
  };

  const handleUpdateUser = (user) => {
    setIsLoadingButton(true);
    mainApi
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
        setSuccessful(true);
        setTooltipMessage('Информация обновлена');
        setInfoTooltipPopupOpen(true);
        setIsInputActive(true);
        setIsButton(false);
      })
      .catch(({ err, message }) => {
        err.status === CREATE_USER_ERROR_CODE
          ? setTooltipMessage('E-mail занят')
          : setTooltipMessage('Что-то пошло не так');
        setSuccessful(false);
        setInfoTooltipPopupOpen(true);
        console.log(message);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  };

  // Movies

  useEffect(() => {
    setIsLoading(true);
    const searchData = JSON.parse(localStorage.getItem('searchMovie'));
    if (path === '/movies' && !!searchData.movies.length) {
      setIsChecked(searchData.isChecked);
      setSearchText(searchData.searchText);
      setIsFound(true);
      setFoundedMovies(searchFilter(searchData.movies, searchText, isChecked));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, [path, isChecked]);

  useEffect(() => {
    if (path === '/saved-movies') {
      setIsChecked(false);
      setSearchText('');
      setFavoriteMovies(favoriteMovies);
      !!favoriteMovies.length ? setIsFound(true) : setIsFound(false);
    }
  }, [path, favoriteMovies]);

  function handleSearchMovies() {
    setIsLoading(true);
    const results = searchFilter(movies, searchText, isChecked);
    localStorage.setItem('searchMovie', JSON.stringify({ movies: results, searchText, isChecked }));
    setFoundedMovies(results);
    setIsFound(!!results.length);
    setTimeout(() => setIsLoading(false), 1000);
  }

  const handleCheckShorts = () => {
    setIsChecked(!isChecked);
    const searchData = JSON.parse(localStorage.getItem('searchMovie'));
    localStorage.setItem('searchMovie', JSON.stringify({ ...searchData, isChecked: !isChecked }));
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .setItems(movie)
      .then((data) => {
        setFavoriteMovies([...favoriteMovies, data]);
        const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
        localStorage.setItem('favorites', JSON.stringify([...favoritesList, movie.movieId]));
      })
      .catch(({ err, message }) => console.log(message));
  };

  const handleRemoveMovie = (movie) => {
    console.log(favoriteMovies);

    const favoriteMovie = favoriteMovies.find((favorite) => favorite.movieId === movie.movieId);
    console.log(favoriteMovie._id);
    mainApi
      .deleteItem(favoriteMovie._id)
      .then((data) => {
        const userFavorites = favoriteMovies.filter(
          (favorite) => favorite.movieId !== movie.movieId
        );
        setFavoriteMovies(userFavorites);
        const favoritesList = JSON.parse(localStorage.getItem('favorites'));
        localStorage.setItem(
          'favorites',
          JSON.stringify(favoritesList.filter((id) => id !== movie.movieId))
        );
      })
      .catch(({ err, message }) => console.log(message));
  };

  function openPopups(message) {
    console.log('открывайся');
    setTooltipMessage(message);
    setInfoTooltipPopupOpen(true);
    setTimeout(() => closePopups(), 2000);
  }

  function closePopups() {
    setInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/movies"
              element={
                <Movies
                  movies={foundedMovies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  isFound={isFound}
                  onSaveMovie={handleSaveMovie}
                  onRemoveMovie={handleRemoveMovie}
                  onSearchMovies={handleSearchMovies}
                  onHandleCheckShorts={handleCheckShorts}
                  isChecked={isChecked}
                  setSearchText={setSearchText}
                  searchText={searchText}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <Movies
                  movies={favoriteMovies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  isFound={isFound}
                  onRemoveMovie={handleRemoveMovie}
                  onHandleCheckShorts={handleCheckShorts}
                  isChecked={isChecked}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  loggedIn={loggedIn}
                  isLoadingButton={isLoadingButton}
                  isInputActive={isInputActive}
                  isButton={isButton}
                  onLogout={handleLogout}
                  onUpdateUser={handleUpdateUser}
                  onEditProfile={handleEditProfile}
                />
              }
            />
            <Route
              path="/signin"
              element={<Login onLogin={handleLogin} isLoadingButton={isLoadingButton} />}
            />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} isLoadingButton={isLoadingButton} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closePopups}
          name="info-tooltip"
          isSuccessful={successful}
          message={tooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
