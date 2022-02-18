import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { logout } from "../actions/userActions";

const WelcomeScreen = (state) => {
  const dispatch = useDispatch();
  const { loading, error, user } = state.auth;

  return (
    <div>
      <h1>Hi, {user ? user.email : 'traveler'}</h1>
      {user 
      ? <button onClick={() => dispatch(logout())}>Logout</button>
      : <div>
        <Link to="/register">Register</Link><br/>
        <Link to="/login">Login</Link>
      </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.userReducer,
});

export default connect(mapStateToProps)(WelcomeScreen);