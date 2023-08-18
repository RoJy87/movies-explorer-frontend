import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="notfound">
      <div className="notfound__container">
        <h2 className="notfound__title">404</h2>
        <p className="notfound__text">Страница не найдена</p>
      </div>
      <button className="notfound_link link" onClick={() => navigate(-2)}>
        Назад
      </button>
    </section>
  );
}
