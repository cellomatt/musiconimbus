import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../images/musiconimbus-logo.png";

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">
          <button className="btn btn--nav">Log In</button>
        </NavLink>
        <NavLink to="/signup">
          <button className="btn btn--nav">Sign Up</button>
        </NavLink>
      </>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            <div className="nav__logo">
              <img className="nav__logo--img" src={logo} alt="logo" />
              <h1 className="nav__logo--title">MusicoNimbus</h1>
            </div>
          </NavLink>
        </li>
        <li>
          <div className="nav__links">
            {isLoaded && sessionLinks}
          </div>
        </li>
      </ul>
    </nav>
  );
}
