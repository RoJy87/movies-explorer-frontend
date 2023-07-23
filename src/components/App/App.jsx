import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";

function App() {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoadingButton, setIsLoadingButton] = React.useState(false);

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

  const handleClickMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="app">
      <button onClick={handleLogin}>Login</button>
      <Header
        isMenuVisible={isMenuVisible}
        handleClickMenu={handleClickMenu}
        loggedIn={loggedIn}
      />
      <Navigation isMenuVisible={isMenuVisible} />
      <Routes>
        <Route path="/" element={<Main />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
