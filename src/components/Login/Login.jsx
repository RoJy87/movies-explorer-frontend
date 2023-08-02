import Input from '../Input/Input';
import AuthPage from '../AuthPage/AuthPage';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

export default function Login({ isLoadingButton, onLogin }) {
  const { values, handleChange, errors, isInputValid, isFormValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
  }

  return (
    <AuthPage
      title="Рады видеть!"
      name="login"
      onSubmit={handleSubmit}
      linkText="Ещё не зарегистрированы?"
      linkName="Регистрация"
      linkPath="/signup"
      isFormValid={isFormValid}
      loadingBtn="Вход..."
      loadedBtn="Войти"
      isLoadingButton={isLoadingButton}>
      <Input
        name="email"
        type="email"
        labelName="E-mail"
        required
        values={values}
        onChange={handleChange}
        errors={errors}
        isInputValid={isInputValid}
      />
      <Input
        name="password"
        type="password"
        labelName="Пароль"
        required
        values={values}
        onChange={handleChange}
        errors={errors}
        isInputValid={isInputValid}
      />
    </AuthPage>
  );
}
