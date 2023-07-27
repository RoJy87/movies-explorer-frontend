import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies({ loggedIn, movies }) {
  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Footer />
    </div>
  );
}
