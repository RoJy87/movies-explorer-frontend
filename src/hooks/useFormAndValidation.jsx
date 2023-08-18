import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { checkPattern } from '../utils/utils';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormIsValid] = useState(false);
  const [isInputValid, setInputIsValid] = useState(true);
  const [isInputsValid, setInputsIsValid] = useState({});
  const path = useLocation().pathname;

  useEffect(() => {
    path === '/signup' && setInputsIsValid({ name: false, email: false, password: false });
    path === '/signin' && setInputsIsValid({ email: false, password: false });
    path === '/profile' && setInputsIsValid({ name: true, email: true });
  }, [path]);

  useEffect(() => {
    setFormIsValid(Object.values(isInputsValid).every((item) => item === true));
  }, [isInputsValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));

    const valid = checkPattern(value, name);
    setErrors((errors) => ({
      ...errors,
      [name]:
        valid === false && !e.target.validationMessage && name === 'name'
          ? 'Length from 2 to 30 characters including Russian and Latin letters, space or dash.'
          : valid === false && !e.target.validationMessage && name === 'email'
          ? 'Should be email pattern'
          : valid === false && !e.target.validationMessage && name === 'password'
          ? 'Length from 6 to 16 characters including Latin letters, numbers and symbols !@#$%^&*'
          : e.target.validationMessage,
    }));
    setInputIsValid(valid);
    setInputsIsValid({ ...isInputsValid, [name]: valid });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setInputIsValid(newIsValid);
      setFormIsValid(newIsValid);
    },
    [setValues, setErrors, setInputIsValid, setFormIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isInputValid,
    isFormValid,
    resetForm,
    setErrors,
    setValues,
    setFormIsValid,
  };
}
