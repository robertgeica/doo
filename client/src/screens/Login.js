import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { login } from "../actions/userActions";

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
    <div>
      {error && <p>error: {error}</p>}
      {loading && <p>Loading</p>}

      <div>

        <form className="form" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email Adress"
            name="email"
            value={email}
            onChange={onChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
});

export default connect(mapStateToProps, { login })(Login);
