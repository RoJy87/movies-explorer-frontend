export default function Form({ name, onSubmit, buttonName, children }) {
  return (
    <form
      action="/"
      className="form"
      id={`form-${name}`}
      name={`${name}`}
      noValidate
      onSubmit={onSubmit}
    >
      {children}
      <button className="form__button button">{buttonName}</button>
    </form>
  );
}
