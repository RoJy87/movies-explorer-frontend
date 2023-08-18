import Input from '../Input/Input';
import AuthPage from '../AuthPage/AuthPage';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

export default function Login({ isLoadingButton, onLogin, isInputDisactive }) {
  const { values, handleChange, errors, isFormValid, setFormIsValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setFormIsValid();
    onLogin(values);
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
        className="login"
        name="email"
        type="email"
        labelName="E-mail"
        placeholder="Введите E-mail..."
        required
        disabled={isInputDisactive}
        values={values}
        onChange={handleChange}
        errors={
          <span className={`input-error ${errors.email ? 'input-error_visible' : ''}`}>
            {errors.email}
          </span>
        }
      />
      <Input
        className="login"
        name="password"
        type="password"
        labelName="Пароль"
        placeholder="Введите пароль..."
        required
        disabled={isInputDisactive}
        minLength={6}
        values={values}
        onChange={handleChange}
        errors={
          <span className={`input-error ${errors.password ? 'input-error_visible' : ''}`}>
            {errors.password}
          </span>
        }
      />
    </AuthPage>
  );
}
