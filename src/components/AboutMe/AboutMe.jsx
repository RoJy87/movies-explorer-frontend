import React from "react";
import my_foto from "../../images/my_foto.jpeg";
import { Link } from "react-router-dom";

export default function AboutMe({ name }) {
  return (
    <section className="about-me">
      <h2 className="title about-me__title">Студент</h2>
      <article className="about-me__container">
        <img
          src={my_foto}
          alt="Моя фотография"
          width={292}
          height={352}
          className="about-me__foto"
        />
        <div className="about-me__info">
          <h3 className="about-me__name">Данил</h3>
          <h4 className="about-me__subtitle text_primary">
            Фронтенд-разработчик, 36 лет
          </h4>
          <p className="about-me__text text_primary">
            Я живу в Краснодаре, закончил факультет Социальных наук ИГЛУ. У меня
            есть жена и два сына. Я люблю слушать музыку, а ещё увлекаюсь
            велосипедом. Недавно начал кодить. С 2016 года работал в компании
            «Астра Зенека». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            className="about-me__link link"
            to="https://github.com/RoJy87"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </article>
    </section>
  );
}
