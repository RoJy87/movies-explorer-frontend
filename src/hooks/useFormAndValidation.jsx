import { useState, useCallback } from 'react';

export function useFormAndValidation(inputValues = {}) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormIsValid] = useState(false);
  const [isInputValid, setInputIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({
      ...errors,
      [name]: e.target.validationMessage
    }));
    setInputIsValid(e.target.closest('input').checkValidity());
    setFormIsValid(e.target.closest('form').checkValidity());
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
    setValues,
    setInputIsValid,
    setErrors
  };
}
