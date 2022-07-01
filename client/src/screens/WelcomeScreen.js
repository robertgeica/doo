import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { logout } from "../actions/userActions";

const WelcomeScreen = (state) => {
  const dispatch = useDispatch();
  const { loading, error, user } = state.auth;

  return (
    <div className="wave-wrapper">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {user ? (
          <button onClick={() => dispatch(logout())}>Logout</button>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link className="button-welcome" to="/register">
              Register
            </Link>
            <br />
            <Link className="button-welcome" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
});

export default connect(mapStateToProps)(WelcomeScreen);
