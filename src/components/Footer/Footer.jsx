import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__links">
        <Link
          className="footer__link link"
          to={"https://practicum.yandex.ru/"}
          target="_blanck"
        >
          Яндекс.Практикум
        </Link>
        <Link
          className="footer__link link"
          to={"https://github.com/RoJy87"}
          target="_blanck"
        >
          Github
        </Link>
      </div>
      <p className="footer__copyright">&#169; {date.getFullYear()}</p>
    </footer>
  );
}
