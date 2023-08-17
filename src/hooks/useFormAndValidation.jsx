import { useState, useCallback } from 'react';
import { EMAIL, NAME, PASSWORD } from '../utils/constants';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormIsValid] = useState(false);
  const [isInputValid, setInputIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));

    if (name === 'email') {
      const pattern = new RegExp(EMAIL);
      const valid = pattern.test(value);
      setErrors((errors) => ({
        ...errors,
        [name]:
          valid === false && !e.target.validationMessage
            ? 'Should be email pattern'
            : e.target.validationMessage,
      }));
      setInputIsValid(valid);
      setFormIsValid(valid);
    } else if (name === 'password') {
      const pattern = new RegExp(PASSWORD);
      const valid = pattern.test(value);
      setErrors((errors) => ({
        ...errors,
        [name]:
          valid === false && !e.target.validationMessage
            ? 'Length from 6 to 16 characters including Latin letters, numbers and symbols !@#$%^&*'
            : e.target.validationMessage,
      }));
      setInputIsValid(valid);
      setFormIsValid(valid);
    } else if (name === 'name') {
      const pattern = new RegExp(NAME);
      const valid = pattern.test(value);
      setErrors((errors) => ({
        ...errors,
        [name]:
          valid === false && !e.target.validationMessage
            ? 'Length from 2 to 30 characters including Russian and Latin letters, space or dash.'
            : e.target.validationMessage,
      }));
      setInputIsValid(valid);
      setFormIsValid(valid);
    } else {
      setErrors((errors) => ({
        ...errors,
        [name]: e.target.validationMessage,
      }));
      setInputIsValid(e.target.checkValidity());
      setFormIsValid(e.target.closest('form').checkValidity());
    }
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
