
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

export default function ProfileButton({user}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
        setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = async (e) => {
      e.preventDefault();
      dispatch(sessionActions.logoutUser());
      history.push("/");
    };

    return (
      <>
        <button className="btn btn--hamburger" onClick={openMenu}>
          <i className="fas fa-bars"></i>
        </button>
        {showMenu && (
        <ul className="dropdown">
          <li className="dropdown__li dropdown__header">Welcome, {user.firstName}!</li>
          <li className="dropdown__li dropdown__email">{user.email}</li>
          <li className="dropdown__li">
            <Link to={`/user/${user.id}`}>
              <button className="btn--dropdown" >
                Profile
              </button>
            </Link>
          </li>
          <li className="dropdown__li">
            <Link to="/explore">
              <button className="btn--dropdown" >
                Explore
              </button>
            </Link>
          </li>
          <li className="dropdown__li">
            <button className="btn--dropdown" onClick={logout}>Log Out</button>
          </li>
        </ul>
        )}
      </>
    )
}
