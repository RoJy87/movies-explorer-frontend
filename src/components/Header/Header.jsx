import React from "react";
import logo from "../../images/logo.svg";
import { classNames } from "../../utils/classNames";
import { useLocation } from "react-router-dom";

export default function Header({ isMenuVisible, handleClickMenu, loggedIn }) {
  const location = useLocation();
  return (
    <header
      className={classNames("header", {
        header_auth: loggedIn,
        header_page_promo: location.pathname === "/",
      })}
    >
      <img src={logo} alt="Логотип сайта" className="header__logo" />
      <div>
        {loggedIn && (
          <button
            onClick={handleClickMenu}
            className={classNames("header__burger", { opened: isMenuVisible })}
          >
            <span className="bar-top"></span>
            <span className="bar-mid"></span>
            <span className="bar-bot"></span>
          </button>
        )}
      </div>
    </header>
  );
}
