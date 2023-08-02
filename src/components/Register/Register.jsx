import Input from '../Input/Input';
import AuthPage from '../AuthPage/AuthPage';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

export default function Login({ isLoadingButton, onRegister }) {
  const { values, handleChange, errors, isInputValid, isFormValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister();
  }

  return (
    <AuthPage
      title="Добро пожаловать!"
      name="register"
      onSubmit={handleSubmit}
      linkText="Уже зарегистрированы?"
      linkName="Войти"
      linkPath="/signin"
      isFormValid={isFormValid}
      loadingBtn="Регистрация..."
      loadedBtn="Зарегистрироваться"
      isLoadingButton={isLoadingButton}
    >
      <Input
        name="name"
        type="text"
        labelName="Имя"
        required
        values={values}
        onChange={handleChange}
        errors={errors}
        isInputValid={isInputValid}
      />
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
