import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <ul class="navbar-menu container">
      <li class="navbar-item">
        <NavLink to="/auth">Login</NavLink>
      </li>
      <li class="navbar-item">
        <NavLink to="/events">Events</NavLink>
      </li>
      <li class="navbar-item">
        <NavLink to="/bookings">Bookings</NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
