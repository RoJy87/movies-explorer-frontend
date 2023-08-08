import { useState } from 'react';

export default function SearchForm({ onSearchMovies, children }) {
  const [searchText, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies(searchText);
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form
          id="search"
          name="search"
          className="search-form__form"
          onSubmit={handleSubmit}
          required>
          <label className="search-form__label" htmlFor="search">
            <input
              className="search-form__input"
              type="text"
              name="search"
              id="search"
              placeholder="Фильм"
              value={searchText}
              onChange={handleChange}
            />
            <button form="search" type="submit" className="search-form__button button" />
          </label>
        </form>
        <div className="search-form__line"></div>
        {children}
      </div>
    </section>
  );
}
