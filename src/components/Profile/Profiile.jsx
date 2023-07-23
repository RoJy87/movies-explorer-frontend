import React from "react";

export default function Profiile({ name, email }) {
  return (
    <div>
      <h2>Привет, {name}!</h2>
      <p>
        <span>Имя</span>
        <span>{name}</span>
      </p>
      <p>
        <span>E-mail</span>
        <span>{email} || example@mail.ru</span>
      </p>
    </div>
  );
}
