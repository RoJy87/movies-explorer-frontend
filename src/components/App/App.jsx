import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { moviesApi } from '../../utils/MoviesApi';
import { classNames } from '../../utils/classNames';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(Boolean);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: 'Данил',
    email: 'pochta@yandex.ru',
    id: '12345'
  });

  const navigate = useNavigate();
  const path = useLocation().pathname;

  useEffect(() => {
    localStorage.getItem('user') ? setLoggedIn(true) : setLoggedIn(false);
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      if (path === '/movies' && !localStorage.getItem('movies')) {
        moviesApi
          .getItems()
          .then((data) => {
            setMovies(data);
            localStorage.setItem('movies', JSON.stringify(data));
            localStorage.setItem(
              'favorites',
              JSON.stringify(favoriteMovies.map((movie) => movie.id))
            );
          })
          .catch((err) => console.log(err));
      }
      if ((path === '/movies' || path === '/saved-movies') && localStorage.getItem('movies')) {
        const moviesList = JSON.parse(localStorage.getItem('movies'));
        setMovies(moviesList);
        if (localStorage.getItem('favorites')) {
          const favoritesList = JSON.parse(localStorage.getItem('favorites'));
          console.log(favoritesList);
          const favoriteMoviesList = moviesList.filter((movie) =>
            favoritesList.includes(movie.id.toString())
          );
          console.log(favoriteMoviesList);
          setFavoriteMovies(favoriteMoviesList);
        } else {
          localStorage.setItem(
            'favorites',
            JSON.stringify(favoriteMovies.map((movie) => movie.id))
          );
        }
      }
    }
  }, [loggedIn, path]);

  const handleSaveCard = (movie) => {
    const favoritesList = JSON.parse(localStorage.getItem('favorites'));
    localStorage.setItem('favorites', JSON.stringify([...favoritesList, movie.id.toString()]));
    setFavoriteMovies([...favoriteMovies, movie]);
  };

  const handleRemoveCard = (movie) => {
    const favoriteMovie = favoriteMovies.find((item) => item.id === movie.id);
    setFavoriteMovies(favoriteMovies.filter((item) => item.id !== favoriteMovie.id));
    const favoritesList = JSON.parse(localStorage.getItem('favorites'));
    localStorage.setItem(
      'favorites',
      JSON.stringify(favoritesList.filter((id) => id !== movie.id.toString()))
    );
  };

  const handleAuth = () => {
    setIsLoadingButton(true);
    setTimeout(() => {
      if (localStorage.getItem('user')) {
        localStorage.clear();
        setLoggedIn(false);
      } else {
        localStorage.setItem('user', JSON.stringify(currentUser));
        setLoggedIn(true);
      }
      navigate('/', { replace: true });
      setIsLoadingButton(false);
    }, 2000);
  };

  const handleRegister = () => {
    setIsLoadingButton(true);
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setSuccessful(true);
        setInfoTooltipPopupOpen(true);
        navigate('/signin', { replace: true });
        return setIsLoadingButton(false);
      }
      setSuccessful(false);
      setInfoTooltipPopupOpen(true);
      setIsLoadingButton(false);
    }, 2000);
  };

  function closePopups() {
    setInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <button
          className={classNames('button', {
            button_login: loggedIn,
            button_logout: !loggedIn
          })}
          onClick={handleAuth}>
          {loggedIn ? 'I' : 'O'}
        </button>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <Movies
                movies={movies}
                loggedIn={loggedIn}
                handleSaveCard={handleSaveCard}
                handleRemoveCard={handleRemoveCard}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <Movies
                movies={favoriteMovies}
                loggedIn={loggedIn}
                handleRemoveCard={handleRemoveCard}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile loggedIn={loggedIn} isLoadingButton={isLoadingButton} />}
          />
          <Route
            path="/signin"
            element={<Login isLoadingButton={isLoadingButton} onLogin={handleAuth} />}
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
          message={
            successful
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
