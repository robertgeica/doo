import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { login } from "../../actions/userActions";

const Login = (state) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;

  const { loading, error, user } = state.auth;

  if (user) {
    return <Navigate replace to="/" />;
  }

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="wave-wrapper">
      {error && <p>error: {error}</p>}
      {loading && <p>Loading</p>}

      <div className="auth-container">
        <h1 className="title">Login</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <input
            type="email"
            className="input"
            placeholder="Email Adress"
            name="email"
            value={email}
            onChange={onChange}
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />

          <button type="submit" className="button">
            Login
          </button>
        </form>
        <p>
          New to Doo? <Link to="/register">Create a new account here!</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
});

export default connect(mapStateToProps, { login })(Login);
