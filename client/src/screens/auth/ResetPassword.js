import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { resetPassword } from "../../actions/userActions";

const ResetPassword = (state) => {
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState('');
  const { loading, error, user } = state.auth;

   if (user) {
    return <Navigate replace to="/" />;
  }

  const onChange = (e) => setNewPassword(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const queryString = window.location.pathname;
    const params = queryString.split(/^\/[^/]+\/([^/]+)\/([^/]+)/g).filter(param => param.length !== 0);

    const id = params[0];
    const token = params[1];
    
    dispatch(resetPassword(id, token, newPassword));
  };
   return (
    <div className="wave-wrapper">
      {error && <p>error: {error}</p>}
      {loading && <p>Loading</p>}

      <div className="auth-container">
        <h1 className="title">Reset passwords</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={newPassword}
            onChange={onChange}
          />

          <button type="submit" className="button">
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
});

export default connect(mapStateToProps)(ResetPassword);
