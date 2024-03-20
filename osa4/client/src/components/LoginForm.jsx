import React from "react";
import PropTypes from "prop-types";

LoginForm.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  handleLogin: PropTypes.func,
};

function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginButton">Login</button>
      </form>
    </>
  );
}

export default LoginForm;
