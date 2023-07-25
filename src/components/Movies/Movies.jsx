import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({ loggedIn }) {
  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
    </div>
  );
}
