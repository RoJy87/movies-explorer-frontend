import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioList } from '../../utils/contentData';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        {portfolioList.map((item, index) => {
          return (
            <li className="portfolio__item" key={index}>
              <Link className="portfolio__link link" to={item.adress} target="_blank">
                {item.name}
              </Link>
              <span className="portfolio__icon">&#8599;</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
