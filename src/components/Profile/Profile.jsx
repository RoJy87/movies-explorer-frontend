import React from "react";
import Input from "../Input/Input";
import Header from "../Header/Header";

export default function Profiile({ name, email, loggedIn }) {
  return (
    <>
      {" "}
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {name}!</h2>
        <form className="profile__form">
          <div className="profile__form-container">
            <h3 className="profile__form-title">Имя</h3>
            <Input
              className="profile"
              name="name"
              type="text"
              value={name}
              placeholder="Имя"
              required
              disabled
            />
          </div>
          <div className="profile__form-container">
            <h3 className="profile__form-title">E-mail</h3>
            <Input
              className="profile"
              name="email"
              type="email"
              value={email}
              placeholder="E-mail"
              required
              disabled
            />
          </div>
        </form>
        <button className="profile__edit-btn">Редактировать</button>
        <button className="profile__logout-btn">Выйти из аккаунта</button>
      </section>
    </>
  );
}
