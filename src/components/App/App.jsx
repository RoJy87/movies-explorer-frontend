import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { classNames } from "../../utils/classNames";
import { moviesApi } from "../../utils/MoviesApi";
import NotFound from "../NotFound/NotFound";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoadingButton, setIsLoadingButton] = React.useState(false);
  const [movies, setMovies] = React.useState([]);

  const path = useLocation().pathname;

  React.useEffect(() => {
    if (path === "/movies") {
      moviesApi.getItems().then((data) => {
        setMovies(data);
      });
    }
  }, [path]);

  React.useEffect(() => {
    if (path === "/saved-movies") {
      moviesApi.getItems().then((data) => {
        setMovies(data);
      });
    }
  }, [path]);

  const handleLogin = () => {
    setIsLoadingButton(true);
    setTimeout(() => {
      setIsLoadingButton(false);
      setLoggedIn(!loggedIn);
    }, 2000);
  };

  const handleRegister = () => {
    setIsLoadingButton(true);
    setTimeout(() => {
      setIsLoadingButton(false);
      setLoggedIn(true);
    }, 2000);
  };

  return (
    <div className="app">
      <button
        className={classNames("button", {
          button_login: loggedIn,
          button_logout: !loggedIn,
        })}
        onClick={handleLogin}
      >
        {loggedIn ? "I" : "O"}
      </button>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/movies"
          element={<Movies movies={movies} loggedIn={loggedIn} />}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies movies={movies} loggedIn={loggedIn} />}
        />
        <Route
          path="/profile"
          element={
            <Profile loggedIn={loggedIn} name="Данил" email="v@mail.ru" />
          }
        />
        <Route
          path="/signin"
          element={
            <Login isLoadingButton={isLoadingButton} onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              onRegister={handleRegister}
              isLoadingButton={isLoadingButton}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
