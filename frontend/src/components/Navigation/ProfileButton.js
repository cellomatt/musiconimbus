
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

export default function ProfileButton({user}) {
    const dispatch = useDispatch();
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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
    };

    return (
      <>
        <button className="btn btn--hamburger" onClick={openMenu}>
          <i class="fas fa-bars"></i>
        </button>
        {showMenu && (
        <ul className="dropdown">
          <li className="dropdown__li dropdown__header">Welcome, {user.firstName}!</li>
          <li className="dropdown__li dropdown__email">{user.email}</li>
          <li className="dropdown__li">
            <button className="btn--dropdown" >Profile</button>
          </li>
          <li className="dropdown__li">
            <button className="btn--dropdown" >Explore</button>
          </li>
          <li className="dropdown__li">
            <button className="btn--dropdown" onClick={logout}>Log Out</button>
          </li>
        </ul>
        )}
      </>
    )
}
