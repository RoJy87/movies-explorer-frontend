import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from '../../utils/classNames';

export default function Footer() {
  const path = useLocation().pathname;
  const date = new Date();

  return (
    <footer className={classNames('footer', { footer_page_movies: path === '/movies' })}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <div className="footer__links">
          <Link className="footer__link link" to={'https://practicum.yandex.ru/'} target="_blanck">
            Яндекс.Практикум
          </Link>
          <Link className="footer__link link" to={'https://github.com/RoJy87'} target="_blanck">
            Github
          </Link>
        </div>
        <p className="footer__copyright">&#169; {date.getFullYear()}</p>
      </div>
    </footer>
  );
}
