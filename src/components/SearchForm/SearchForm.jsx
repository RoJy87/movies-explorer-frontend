import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

export default function SearchForm() {
  const [checked, setChecked] = useState(false);

  return (
    <section className="search-form">
      <div className="search-form__container">
        <label className="search-form__label" htmlFor="search">
          <input
            className="search-form__input"
            type="text"
            name="search"
            id="search"
            placeholder="Фильм"
          />
          <button className="search-form__button button"></button>
        </label>
        <label
          className={classNames("checkbox", { checked: checked })}
          htmlFor="checkbox"
          onChange={() => setChecked(!checked)}
        >
          <input type="checkbox" name="short-film" id="checkbox" />{" "}
          Короткометражки
        </label>
      </div>
    </section>
  );
}
