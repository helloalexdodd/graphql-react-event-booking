import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef('');
  const passwordRef = useRef('');

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
        query {
          login(email: "${email}",  password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    };

    if (!isLogin) {
      requestBody = {
        query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
            email
          }
        }
        `,
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
      // if (res.status !== 200 || res.status !== 201) {
      //   throw new Error('Failed');
      // }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    // emailRef.current.value = '';
    // passwordRef.current.value = '';
  };

  return (
    <div className="columns">
      <form
        onSubmit={handleSubmit}
        className="column is-half is-offset-one-quarter"
      >
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <label className="label">Email</label>
            <input
              ref={emailRef}
              className="input"
              type="email"
              placeholder="Email"
            />
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label">Password</label>
            <input
              ref={passwordRef}
              className="input"
              type="password"
              placeholder="Password"
            />
          </p>
        </div>
        <div className="level">
          <div className="level-item">
            <div className="field">
              <p className="control">
                <button type="submit" className="button is-success">
                  {isLogin ? 'Login' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
          <div className="level-item">
            <div className="field">
              <p className="control">
                <button
                  type="button"
                  className="button is-info"
                  onClick={handleSwitch}
                >
                  {isLogin ? 'Sign In' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;
