import Input from '../Input/Input';
import AuthPage from '../AuthPage/AuthPage';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { EMAIL, PASSWORD } from '../../utils/constants';

export default function Login({ isLoadingButton, onLogin }) {
  const { values, setValues, handleChange, errors, isInputValid, isFormValid } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values, setValues);
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
        values={values}
        onChange={handleChange}
        errors={
          <span className={`input-error ${!isInputValid ? 'input-error_visible' : ''}`}>
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
        minLength={6}
        values={values}
        onChange={handleChange}
        errors={
          <span className={`input-error ${!isInputValid ? 'input-error_visible' : ''}`}>
            {errors.password}
          </span>
        }
      />
    </AuthPage>
  );
}
