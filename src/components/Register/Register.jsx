import { useEffect, useState } from "react";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";

export default function Login({ isLoadingButton }) {
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    isLoadingButton
      ? setButtonName("Регистрация...")
      : setButtonName("Зарегистрироваться");
  }, [isLoadingButton]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <AuthPage
      title="Добро пожаловать!"
      name="register"
      onSubmit={handleSubmit}
      buttonName={buttonName}
      linkText="Уже зарегистрированы?"
      linkName="Войти"
      linkPath="/signin"
    >
      <Input name="name" type="text" labelName="Имя" required />
      <Input name="email" type="email" labelName="E-mail" required />
      <Input name="password" type="password" labelName="Пароль" required />
    </AuthPage>
  );
}
