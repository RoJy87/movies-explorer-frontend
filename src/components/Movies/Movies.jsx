import { Outlet } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function Movies({ loggedIn, movies, handleSaveCard, handleRemoveCard }) {
  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm>
        <FilterCheckbox />
      </SearchForm>
      <MoviesCardList
        movies={movies}
        handleSaveCard={handleSaveCard}
        handleRemoveCard={handleRemoveCard}
      />
      <Footer />
      <Outlet />
    </section>
  );
}
