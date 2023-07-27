import { useEffect, useState } from "react";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";

export default function Login({ isLoadingButton }) {
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    isLoadingButton ? setButtonName("Вход...") : setButtonName("Войти");
  }, [isLoadingButton]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <AuthPage
      title="Рады видеть!"
      name="login"
      onSubmit={handleSubmit}
      buttonName={buttonName}
      linkText="Ещё не зарегистрированы?"
      linkName="Регистрация"
      linkPath="/signup"
    >
      <Input name="email" type="email" labelName="E-mail" required />
      <Input name="password" type="password" labelName="Пароль" required />
    </AuthPage>
  );
}
