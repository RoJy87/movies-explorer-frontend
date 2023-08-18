import React from 'react';
import logo from '../../images/logo.svg';
import { classNames } from '../../utils/classNames';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header({ loggedIn, children }) {
  const path = useLocation().pathname;

  return (
    <header
      className={classNames('header', {
        header_auth: loggedIn,
        header_page_promo: path === '/',
      })}
    >
      <Link to={'/'} className="header__logo">
        <img src={logo} alt="Логотип сайта" />
      </Link>

      {loggedIn ? (
        <Navigation />
      ) : (
        <div className="header__links">
          <Link to="/signup" className="header__link link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__button link">
            Вход
          </Link>
          {children}
        </div>
      )}
    </header>
  );
}
