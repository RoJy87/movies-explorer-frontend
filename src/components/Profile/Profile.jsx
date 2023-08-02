import React, { useContext, useState } from 'react';
import Input from '../Input/Input';
import Header from '../Header/Header';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';

export default function Profile({ loggedIn, isLoadingButton, onHandleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [isInputActive, setIsInputActive] = useState(true);
  const [isButton, setIsButton] = useState(false);
  const { values, handleChange, errors, isInputValid, isFormValid } = useFormAndValidation({
    name: currentUser.name,
    email: currentUser.email
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (isInputActive) {
      setIsInputActive(false);
      setIsButton(true);
    } else {
      setIsInputActive(true);
      setIsButton(false);
    }
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {values.name}!</h2>
        <Form
          name="profile"
          className="profile-form"
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          loadingBtn="Сохранение..."
          loadedBtn={!isInputActive ? 'Сохранить' : 'Редактировать'}
          isLoadingButton={isLoadingButton}
          isButton={isButton}
        >
          <div className="profile-form__container">
            <h3 className="profile-form__title">Имя</h3>
            <Input
              className="profile-form"
              name="name"
              type="text"
              required
              disabled={isInputActive}
              values={values}
              onChange={handleChange}
              errors={errors}
              isInputValid={isInputValid}
            />
          </div>
          <div className="profile-form__underlinne"></div>
          <div className="profile-form__container">
            <h3 className="profile-form__title">E-mail</h3>
            <Input
              className="profile-form"
              name="email"
              type="email"
              required
              disabled={isInputActive}
              values={values}
              onChange={handleChange}
              errors={errors}
              isInputValid={isInputValid}
            />
          </div>
        </Form>
        {isInputActive && (
          <div className="profile__buttons">
            <button className="profile__edit-btn button" onClick={handleSubmit}>
              Редактировать
            </button>
            <button className="profile__logout-btn button" onClick={onHandleLogout}>
              Выйти из аккаунта
            </button>
          </div>
        )}
      </section>
    </>
  );
}
