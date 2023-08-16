export default function SearchForm({ onSubmit, onChange, searchValue, children }) {
  const handleChange = (e) => {
    onChange(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form
          id="search"
          name="search"
          className="search-form__form"
          onSubmit={handleSubmit}
          required
        >
          <label className="search-form__label" htmlFor="search">
            <input
              className="search-form__input"
              type="text"
              name="search"
              id="search"
              placeholder="Фильм"
              value={searchValue || ''}
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
