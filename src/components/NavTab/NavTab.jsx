import React, { useState, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import { useClickOutside } from '../../hooks/useClickOutside';

export default function NavTab() {
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef(null);

  useClickOutside(navRef, () => {
    if (isActive) setTimeout(() => setIsActive(false), 500);
  });

  const onClickNavTab = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="navtab">
      <button className="navtab__button button" onClick={onClickNavTab}>
        Узнать больше
      </button>
      <nav
        ref={navRef}
        className={classNames('navtab__list', {
          navtab__list_active: isActive,
        })}
      >
        <a href="#about" className="navtab__link">
          О проекте
        </a>
        <a href="#techs" className="navtab__link">
          Технологии
        </a>
        <a href="#about-me" className="navtab__link">
          Студент
        </a>
      </nav>
    </div>
  );
}
