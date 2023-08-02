// import { useLocation } from "react-router-dom";
import React, { useEffect, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../utils/constants';
import { useClickOutside } from '../../hooks/useClickOutside';

function Navigation() {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const path = useLocation().pathname;
  const navigationRef = useRef(null);

  const handleClickMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useClickOutside(navigationRef, () => {
    if (isMenuVisible) setTimeout(() => setIsMenuVisible(false), 500);
  });

  useEffect(() => {
    setIsMenuVisible(false);
  }, [path]);

  return (
    <div className={classNames('navigation')}>
      <nav
        ref={navigationRef}
        className={classNames('navigation__links', {
          navigation__links_active: isMenuVisible
        })}
      >
        {isMenuVisible && (
          <Link to={'/'} className="navigation__link link">
            Главная
          </Link>
        )}
        {navLinks.map((navLink) => {
          return (
            <Link key={Date.now() + Math.random()} to={navLink.to} className={`navigation__link`}>
              {navLink.title}
            </Link>
          );
        })}
        <Link to={'/profile'} className="navigation__button link">
          Аккаунт
        </Link>
      </nav>
      <button
        onClick={handleClickMenu}
        className={classNames('navigation__burger', { opened: isMenuVisible })}
      >
        <span className="bar-top"></span>
        <span className="bar-mid"></span>
        <span className="bar-bot"></span>
      </button>
    </div>
  );
}

export default Navigation;