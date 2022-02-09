import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { register } from "../../actions/userActions";
import Loader from '../../layout/utils/Loader';

const Register = (state) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = userData;
  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(username, email, password));
  };

  const { loading, error, user } = state.auth;

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="wave-wrapper">
      {error && <p>error: {error}</p>}
      {loading && <Loader />}

      <div className="auth-container">
        <h1 className="title">Register</h1>

        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            className="input"
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            className="input"
          />

          <button type="submit" className="button">Register</button>
        </form>
      <p>Already have an account? <Link to="/login">Try to login</Link></p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
});

export default connect(mapStateToProps)(Register);
