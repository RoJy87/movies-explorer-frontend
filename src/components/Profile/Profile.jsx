import React, { useContext, useEffect } from 'react';
import Input from '../Input/Input';
import Header from '../Header/Header';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';

export default function Profile({
  loggedIn,
  isLoadingButton,
  isInputDisactive,
  isButton,
  onLogout,
  onUpdateUser,
  onEditProfile,
  onCancelEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, resetForm, errors, handleChange, isFormValid, setFormIsValid } =
    useFormAndValidation();

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onUpdateUser, currentUser, setValues]);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setFormIsValid(false);
    }
  }, [values.name, values.email, currentUser.name, currentUser.email, setFormIsValid]);

  function handleSubmit(e) {
    e.preventDefault();
    setFormIsValid(false);
    onUpdateUser(values);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <Form
            name="profile"
            className="profile-form"
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            loadingBtn="Сохранение..."
            loadedBtn={isInputDisactive ? 'Редактировать' : 'Сохранить'}
            isLoadingButton={isLoadingButton}
            isButton={isButton}>
            <Input
              labelName="Имя"
              placeholder="Введите Имя..."
              className="profile-form"
              name="name"
              type="text"
              minLength={2}
              required
              disabled={isInputDisactive}
              values={values}
              onChange={handleChange}
            />
            <Input
              labelName="E-mail"
              placeholder="Введите E-mail..."
              className="profile-form"
              name="email"
              type="email"
              required
              disabled={isInputDisactive}
              values={values}
              onChange={handleChange}
            />
            {errors.name && (
              <span className={`input-error ${errors.name ? 'input-error_visible' : ''}`}>
                Ошибка имени: {errors.name}
              </span>
            )}
            {errors.email && (
              <span className={`input-error ${errors.email ? 'input-error_visible' : ''}`}>
                Ошибка E-mail: {errors.email}
              </span>
            )}
          </Form>
          {isInputDisactive ? (
            <div className="profile__buttons">
              <button className="profile__edit-btn button" onClick={onEditProfile}>
                Редактировать
              </button>
              <button className="profile__logout-btn button" onClick={onLogout}>
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            <button className="profile__cancel-btn button" onClick={onCancelEditProfile}>
              Отменить
            </button>
          )}
        </div>
      </main>
    </>
  );
}
