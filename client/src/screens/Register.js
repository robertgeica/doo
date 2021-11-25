import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { register } from "../actions/userActions";

const Register = (state) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userData;
  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(email, password));
  };

  const { loading, error, user } = state.auth;

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      {error && <p>error: {error}</p>}
      {loading && <p>Loading</p>}

      <div className="register">
        <h1>Register</h1>
        <p>Create a new account</p>

        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />

          <button type="submit">
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
});

export default connect(mapStateToProps)(Register);
