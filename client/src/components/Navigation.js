import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav
    className="navbar block is-link"
    role="navigation"
    aria-label="main navigation"
  >
    <ul className="navbar-menu container">
      <li className="navbar-item has-text-white">
        <NavLink className="has-text-white" to="/auth">
          Login
        </NavLink>
      </li>
      <li className="navbar-item has-text-white">
        <NavLink className="has-text-white" to="/events">
          Events
        </NavLink>
      </li>
      <li className="navbar-item has-text-white">
        <NavLink className="has-text-white" to="/bookings">
          Bookings
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
