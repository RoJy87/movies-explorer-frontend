import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function Input({ name, type, labelName, ...otherProps }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  console.log(isValid);

  return (
    <label className="label">
      {labelName}
      <input
        id={`input-${name}`}
        className={`input input_value_${name} ${!isValid && "input__error"}`}
        type={type}
        name={name}
        minLength="2"
        maxLength="30"
        value={values[name]}
        onChange={handleChange}
        {...otherProps}
      />
      <span className={`${name}-input-error input__error`}>{errors[name]}</span>
    </label>
  );
}
