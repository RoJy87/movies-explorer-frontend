import React from 'react';
import { aboutProjectList } from '../../utils/contentData';

export default function AboutProject() {
  return (
    <section className="about" id="about">
      <h2 className="title about__title">О проекте</h2>
      <ul className="about__list">
        {aboutProjectList.map((item, index) => {
          return (
            <li key={index} className="about__item">
              <h3 className="about__item-title">{item.title}</h3>
              <p className="about__item-text">{item.text}</p>
            </li>
          );
        })}
      </ul>
      <div className="about__timeline">
        <div className="about__timeline-cell">
          <p className="about__timeline-title about__timeline-title_colored">1 неделя</p>
          <span className="about__timeline-text">Back-end</span>
        </div>
        <div className="about__timeline-cell">
          <p className="about__timeline-title">4 недели</p>
          <span className="about__timeline-text">Front-end</span>
        </div>
      </div>
    </section>
  );
}
