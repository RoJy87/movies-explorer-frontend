export default function SearchForm({ onSearchMovies, setSearchText, searchText, children }) {
  const handleChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies();
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form id="search" name="search" className="search-form__form" onSubmit={handleSubmit}>
          <label className="search-form__label" htmlFor="search">
            <input
              className="search-form__input"
              type="text"
              name="search"
              id="search"
              placeholder="Фильм"
              value={searchText || ''}
              onChange={handleChange}
              required
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
