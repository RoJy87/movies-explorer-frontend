export default function Input({
  name,
  type,
  labelName,
  className,
  isInputValid,
  values,
  errors,
  onChange,
  children,
  ...otherProps
}) {
  return (
    <label htmlFor={`input-${name}`} className={`label ${className ? className + '__label' : ''}`}>
      {labelName}
      <input
        id={`input-${name}`}
        className={`input ${className ? className + '__input' : ''} `}
        type={type}
        name={name}
        minLength="2"
        maxLength="30"
        value={values[name] || ''}
        onChange={onChange}
        {...otherProps}
      />
      {errors}
    </label>
  );
}
