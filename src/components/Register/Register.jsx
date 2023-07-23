import { useEffect, useState } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { Link } from "react-router-dom";

export default function Login({ isLoadingButton, onLogin }) {
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    isLoadingButton ? setButtonName("Вход...") : setButtonName("Войти");
  }, [isLoadingButton]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Form
      name="login"
      onSubmit={handleSubmit}
      btnName={buttonName}
      title="Рады видеть!"
    >
      <Input name="name" type="text" labelName="Имя" required />
      <Input name="email" type="email" labelName="E-mail" required />
      <Input name="password" type="password" labelName="Пароль" required />
      <button className="form__button button">{buttonName}</button>
      <span className="text">
        Уже зарегистрированы?{" "}
        <Link className="link button" to="/signin">
          Войти
        </Link>
      </span>
    </Form>
  );
}
