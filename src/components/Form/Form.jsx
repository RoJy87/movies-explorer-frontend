export default function Form(props) {
  return (
    <form
      action="/"
      className="form"
      id={`form-${props.name}`}
      name={`${props.name}`}
      noValidate
      onSubmit={props.onSubmit}
    >
      <h2 className="form__header">{`${props.title}`}</h2>
      {props.children}
    </form>
  );
}
