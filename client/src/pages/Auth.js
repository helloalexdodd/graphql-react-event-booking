import React, { useState, useRef, useContext } from 'react';
import AuthContext from '../context/auth-context';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const authContext = useContext(AuthContext);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: { email, password },
    };

    if (!isLogin) {
      requestBody = {
        query: `
        mutation CreateUser($email: String!, $password: String!) {
          createUser(userInput: {email: $email, password: $password}) {
            _id
            email
          }
        }
        `,
        variables: { email, password },
      };
    }

    try {
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { data } = await res.json();

      if (data.login.token) {
        authContext.login(
          data.login.token,
          data.login.userId,
          data.login.tokenExpiration
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="columns">
      <form
        onSubmit={handleSubmit}
        className="column is-half is-offset-one-quarter"
      >
        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <p className="control has-icons-left has-icons-right">
            <input
              ref={emailRef}
              className="input"
              type="email"
              placeholder="Email"
              native-type="email"
              name="email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <label className="label" htmlFor="password">
            Password
          </label>
          <p className="control has-icons-left">
            <input
              ref={passwordRef}
              className="input"
              type="password"
              placeholder="Password"
              native-type="password"
              name="password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <button native-type="submit" className="button is-primary">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </p>
          <p className="control">
            <button
              native-type="button"
              className="button is-info"
              onClick={handleSwitch}
            >
              Switch to {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Auth;
