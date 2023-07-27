import Form from "../Form/Form";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function AuthPage({
  title,
  name,
  onSubmit,
  buttonName,
  linkText,
  linkName,
  linkPath,
  children,
}) {
  return (
    <section className="auth">
      <img
        src={logo}
        alt="Логотип"
        className="auth__logo"
        width={38}
        height={38}
      />
      <h2 className="auth__title">{title}</h2>
      <Form name={name} onSubmit={onSubmit} buttonName={buttonName}>
        {children}
      </Form>
      <span className="auth__text">
        {linkText}{" "}
        <Link className="auth__link link button" to={linkPath}>
          {linkName}
        </Link>
      </span>
    </section>
  );
}
