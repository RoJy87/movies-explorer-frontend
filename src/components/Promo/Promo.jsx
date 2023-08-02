import React from 'react';
import landing__main from '../../images/landing__main.svg';

export default function Promo({ children }) {
  return (
    <section className="promo">
      <img className="promo__img" src={landing__main} alt="Схема планеты словами Web" />
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__text">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        {children}
      </div>
    </section>
  );
}
