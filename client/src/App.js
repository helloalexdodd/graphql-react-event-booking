import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthContext from './context/auth-context';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import Navigation from './components/Navigation';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <Navigation />
        <main>
          <Switch>
            {!token && <Redirect from="/" to="auth" exact />}
            {!token && <Route path="/auth" component={AuthPage} />}
            {!!token && <Redirect from="/auth" to="events" exact />}
            {!!token && <Redirect from="/" to="events" exact />}
            <Route path="/events" component={EventsPage} />
            {!!token && <Route path="/bookings" component={BookingsPage} />}
          </Switch>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
