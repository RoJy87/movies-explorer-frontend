export default function Input({
  name,
  type,
  labelName,
  className,
  isInputValid,
  values,
  errors,
  onChange,
  ...otherProps
}) {
  return (
    <label htmlFor={`input-${name}`} className={`label ${className}__label`}>
      {labelName}
      <input
        id={`input-${name}`}
        className={`input ${className}__input input_value_${name} ${
          !isInputValid && 'input__error'
        }`}
        type={type}
        name={name}
        minLength="2"
        maxLength="30"
        value={values[name] || ''}
        onChange={onChange}
        {...otherProps}
      />
      <span className={`${name}-input-error input__error`}>{errors[name]}</span>
    </label>
  );
}
