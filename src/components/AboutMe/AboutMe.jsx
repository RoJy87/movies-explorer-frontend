import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import my_foto from '../../images/my_foto.jpeg';

export default function AboutMe() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="about-me" id="about-me">
      <h2 className="title about-me__title">Студент</h2>
      <article className="about-me__container">
        <img src={my_foto} alt="Моя фотография" className="about-me__foto" />
        <div className="about-me__info">
          <h3 className="about-me__name">{currentUser.name}</h3>
          <h4 className="about-me__subtitle text-primary">Фронтенд-разработчик, 36 лет</h4>
          <p className="about-me__text text-primary">
            Я живу в Краснодаре, закончил факультет Социальных наук ИГЛУ. У меня есть жена и два
            сына. Я люблю слушать музыку, а ещё увлекаюсь велосипедом. Недавно начал кодить. С 2016
            года работал в компании «Астра Зенека». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link className="about-me__link link" to="https://github.com/RoJy87" target="_blank">
            GitHub
          </Link>
        </div>
      </article>
    </section>
  );
}
