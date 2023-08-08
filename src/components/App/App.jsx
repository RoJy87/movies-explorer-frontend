import { useEffect, useState } from 'react';
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(Boolean);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [isInputActive, setIsInputActive] = useState(true);
  const [isButton, setIsButton] = useState(false);
  const [isFound, setIsFound] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();
  const path = useLocation().pathname;

  function searchFilter(data, searchText) {
    return data.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchText) ||
        movie.nameEN.toLowerCase().includes(searchText)
    );
  }

  // User

  useEffect(() => {
    // const moviesList = JSON.parse(localStorage.getItem('movies'));
    auth
      .getAuthInfo()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
      })
      .then(() => {
        const searchText = JSON.parse(localStorage.getItem('searchText'));
        handleSearchMovies(searchText);
      })
      .catch(({ err, message }) => console.log(message));
  }, [loggedIn]);

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
        console.log(err);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  };

  // Movies

  const handleSearchMovies = (searchText) => {
    moviesApi
      .getItems()
      .then((data) => {
        const results = searchFilter(data, searchText);
        localStorage.clear('searchText');
        localStorage.setItem('searchText', JSON.stringify(searchText));
        return results;
      })
      .then((data) => {
        console.log(data);
        if (data) {
          setMovies(data);
          setIsFound(true);
        }
      })
      .catch(({ err, message }) => console.log(message));
  };

  const handleSaveMovie = (movie) => {
    const favoritesList = JSON.parse(localStorage.getItem('favorites'));
    localStorage.setItem('favorites', JSON.stringify([...favoritesList, movie.id]));
    setFavoriteMovies([...favoriteMovies, movie]);
  };

  const handleRemoveMovie = (movie) => {
    const favoriteMovie = favoriteMovies.find((item) => item.id === movie.id);
    setFavoriteMovies(favoriteMovies.filter((item) => item.id !== favoriteMovie.id));
    const favoritesList = JSON.parse(localStorage.getItem('favorites'));
    localStorage.setItem(
      'favorites',
      JSON.stringify(favoritesList.filter((id) => id !== movie.id))
    );
  };

  function closePopups() {
    setInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <Movies
                movies={movies}
                loggedIn={loggedIn}
                isFound={isFound}
                onSaveMovie={handleSaveMovie}
                onRemoveMovie={handleRemoveMovie}
                onSearchMovies={handleSearchMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <Movies
                movies={movies}
                loggedIn={loggedIn}
                isFound={isFound}
                onRemoveMovie={handleRemoveMovie}
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
