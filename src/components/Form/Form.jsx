import { useEffect, useState } from 'react';

export default function Form({
  name,
  onSubmit,
  isFormValid,
  className = '',
  isButton,
  loadingBtn,
  loadedBtn,
  isLoadingButton,
  children
}) {
  const [buttonName, setButtonName] = useState(loadedBtn);

  useEffect(() => {
    isLoadingButton ? setButtonName(loadingBtn) : setButtonName(loadedBtn);
  }, [isLoadingButton, loadingBtn, loadedBtn]);

  return (
    <form
      action="/"
      className={`form ${className}`}
      id={`form-${name}`}
      name={name}
      noValidate
      onSubmit={onSubmit}
    >
      {children}
      <button
        type="submit"
        className={`form__button ${className && className + '__button'} button`}
        disabled={!isFormValid}
      >
        {buttonName}
      </button>
    </form>
  );
}
