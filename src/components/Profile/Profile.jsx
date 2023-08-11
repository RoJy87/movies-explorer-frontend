import React, { useContext, useEffect } from 'react';
import Input from '../Input/Input';
import Header from '../Header/Header';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';

export default function Profile({
  loggedIn,
  isLoadingButton,
  isInputActive,
  isButton,
  onLogout,
  onUpdateUser,
  onEditProfile
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, isFormValid, setFormIsValid } = useFormAndValidation();

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email
    });
  }, [onUpdateUser, currentUser]);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setFormIsValid(false);
    }
  }, [values.name, values.email]);

  function handleSubmit(e) {
    e.preventDefault();
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
            loadedBtn={!isInputActive ? 'Сохранить' : 'Редактировать'}
            isLoadingButton={isLoadingButton}
            isButton={isButton}>
            <Input
              labelName="Имя"
              placeholder="Введите Имя..."
              className="profile-form"
              name="name"
              type="text"
              required
              disabled={isInputActive}
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
              disabled={isInputActive}
              values={values}
              onChange={handleChange}
            />
          </Form>
          {isInputActive && (
            <div className="profile__buttons">
              <button className="profile__edit-btn button" onClick={onEditProfile}>
                Редактировать
              </button>
              <button className="profile__logout-btn button" onClick={onLogout}>
                Выйти из аккаунта
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
