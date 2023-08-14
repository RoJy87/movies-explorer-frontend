import { useCallback, useEffect, useState } from 'react';
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
import {
  CREATE_USER_ERROR_CODE,
  DUBLICATE_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SUCCESS_LOGIN_MESSAGE,
  SUCCESS_REGISTER_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
  UNDEFINED_ERROR_MESSAGE,
  VALID_ERROR_MESSAGE,
} from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';
import { moviesHandler } from '../../utils/utils';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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
  const [currentUser, setCurrentUser] = useState({});
  const [DataErrorMessage, setDataErrorMessage] = useState('');

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const checkToken = useCallback(() => {
    auth
      .getAuthInfo()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
        if (path === '/signin' || path === '/signup') {
          navigate('/movies');
        } else {
          navigate(path);
        }
      })
      .catch(({ err, message }) => console.log(message));
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getItems(), moviesApi.getItems()])
        .then(([favoriteMovies, movies]) => {
          const structuredMovies = moviesHandler(movies);
          setMovies(structuredMovies);
          if (favoriteMovies) {
            const userFavorites = favoriteMovies.filter((movie) => movie.owner === currentUser._id);
            setFavoriteMovies(userFavorites);
            const favoritesId = userFavorites.map((movie) => movie.movieId);
            localStorage.setItem('favorites', JSON.stringify(favoritesId));
          }
        })
        .catch(({ err, message }) => {
          setDataErrorMessage(SERVER_ERROR_MESSAGE);
          console.log(message);
        });
    }
  }, [loggedIn, currentUser._id]);

  // User

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
        openTooltip({
          message: SUCCESS_LOGIN_MESSAGE,
          success: true,
        });
        setTimeout(() => {
          navigate('/movies');
        }, 2000);
      })
      .catch(({ err, message }) => {
        openTooltip({
          message: err === undefined ? SERVER_ERROR_MESSAGE : VALID_ERROR_MESSAGE,
          success: false,
        });
        console.log(message);
        console.log(err);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  function handleLogout() {
    auth.logout();
    setLoggedIn(false);
    localStorage.clear();
    setFavoriteMovies([]);
    navigate('/signin', { replace: true });
  }

  const handleRegister = (values) => {
    setIsLoadingButton(true);
    const { name, email, password } = values;
    auth
      .register(name, email, password)
      .then(() => {
        setSuccessful(true);
        openTooltip({
          message: SUCCESS_REGISTER_MESSAGE,
          success: true,
        });
        navigate('/signin');
      })
      .catch(({ err, message }) => {
        console.log(message);
        openTooltip({
          message:
            err.status === CREATE_USER_ERROR_CODE
              ? DUBLICATE_ERROR_MESSAGE
              : UNDEFINED_ERROR_MESSAGE,
          success: false,
        });
      })
      .finally(() => setIsLoadingButton(false));
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsInputActive(false);
    setIsButton(true);
  };

  const cancelEditProfile = (e) => {
    e.preventDefault();
    setIsInputActive(true);
    setIsButton(false);
  };

  const handleUpdateUser = (user) => {
    setIsLoadingButton(true);
    mainApi
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
        openTooltip({
          message: SUCCESS_UPDATE_MESSAGE,
          success: true,
        });
        setIsInputActive(true);
        setIsButton(false);
      })
      .catch(({ err, message }) => {
        openTooltip({
          message:
            err.status === CREATE_USER_ERROR_CODE
              ? DUBLICATE_ERROR_MESSAGE
              : UNDEFINED_ERROR_MESSAGE,
          success: false,
        });
        console.log(message);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  };

  // Movies

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
    const favoriteMovie = favoriteMovies.find((favorite) => favorite.movieId === movie.movieId);
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

  // Tooltip

  function handleEmptySearch() {
    openTooltip({
      message: 'Нужно ввести ключевое слово',
      success: false,
    });
  }

  function openTooltip({ message, success }) {
    setTooltipMessage(message);
    setSuccessful(success);
    setInfoTooltipPopupOpen(true);
    setTimeout(() => closeTooltip(), 2000);
  }

  function closeTooltip() {
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
              <ProtectedRoute
                movies={movies}
                loggedIn={loggedIn}
                onSaveMovie={handleSaveMovie}
                onRemoveMovie={handleRemoveMovie}
                handleEmptySearch={handleEmptySearch}
                DataErrorMessage={DataErrorMessage}
                element={Movies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                movies={favoriteMovies}
                loggedIn={loggedIn}
                onRemoveMovie={handleRemoveMovie}
                handleEmptySearch={handleEmptySearch}
                element={Movies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                isLoadingButton={isLoadingButton}
                isInputActive={isInputActive}
                isButton={isButton}
                onLogout={handleLogout}
                onUpdateUser={handleUpdateUser}
                onEditProfile={handleEditProfile}
                onCancelEditProfile={cancelEditProfile}
                element={Profile}
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
          onClose={closeTooltip}
          name="info-tooltip"
          isSuccessful={successful}
          message={tooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
