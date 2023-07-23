import React from "react";
import { techsList } from "../../utils/constants";

export default function Techs() {
  return (
    <section className="techs">
      <h2 className="title techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text text_primary">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        {techsList.map((item) => {
          return (
            <li className="techs__item" key={Date.now() + Math.random()}>
              {item}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
