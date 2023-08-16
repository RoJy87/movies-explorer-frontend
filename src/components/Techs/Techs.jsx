import React from 'react';
import { techsList } from '../../utils/contentData';

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="title techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text text-primary">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs__list">
        {techsList.map((item, index) => {
          return (
            <li className="techs__item" key={index}>
              {item}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
