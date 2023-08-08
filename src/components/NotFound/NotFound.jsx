import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound__container">
        <h2 className="notfound__title">404</h2>
        <p className="notfound__text">Страница не найдена</p>
      </div>
      <Link className="notfound_link link" to={'/'}>
        Назад
      </Link>
    </section>
  );
}
