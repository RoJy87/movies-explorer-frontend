import Input from '../Input/Input';
import AuthPage from '../AuthPage/AuthPage';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

export default function Login({ isLoadingButton, onRegister, isInputDisactive }) {
  const { values, handleChange, errors, isFormValid, setFormIsValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setFormIsValid(false);
    onRegister(values);
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
      isLoadingButton={isLoadingButton}>
      <Input
        className="register"
        name="name"
        type="text"
        labelName="Имя"
        placeholder="Введите Имя..."
        required
        disabled={isInputDisactive}
        minLength={2}
        values={values}
        onChange={handleChange}
        errors={
          <span className={`input-error ${errors.name ? 'input-error_visible' : ''}`}>
            {errors.name}
          </span>
        }
      />
      <Input
        className="register"
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
        className="register"
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
