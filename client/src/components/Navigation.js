import React from 'react';
import AuthContext from '../context/auth-context';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <AuthContext.Consumer>
    {({ token, logout }) => (
      <nav
        className="navbar block is-link"
        role="navigation"
        aria-label="main navigation"
      >
        <ul className="navbar-menu container">
          {!token && (
            <li className="navbar-item has-text-white">
              <NavLink className="has-text-white" to="/auth">
                Login
              </NavLink>
            </li>
          )}
          <li className="navbar-item has-text-white">
            <NavLink className="has-text-white" to="/events">
              Events
            </NavLink>
          </li>
          {!!token && (
            <>
              <li className="navbar-item has-text-white">
                <NavLink className="has-text-white" to="/bookings">
                  Bookings
                </NavLink>
              </li>
              <li className="navbar-item has-text-white">
                <NavLink className="has-text-white" to="/auth" onClick={logout}>
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    )}
  </AuthContext.Consumer>
);

export default Navigation;
