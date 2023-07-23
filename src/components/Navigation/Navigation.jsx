// import { useLocation } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import { Link } from "react-router-dom";
import { navLinks } from "../../utils/constants";

function Navigation({ isMenuVisible }) {
  // const path = useLocation().pathname;

  return (
    <div
      className={classNames("navigation", { navigation_active: isMenuVisible })}
    >
      <nav className={`navigation__links`}>
        {navLinks.map((navLink) => {
          return (
            <Link
              key={Date.now() + Math.random()}
              to={navLink.to}
              className={`navigation__link`}
            >
              {navLink.title}
            </Link>
          );
        })}
      </nav>
      <button className="navigation__button">Аккаунт</button>
    </div>
  );
}

export default Navigation;
