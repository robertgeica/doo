import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { sendResetPasswordEmail } from "../../actions/userActions";

const SendResetPassword = (state) => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');

  const { loading, error, user } = state.auth;

  if (user) {
    return <Navigate replace to="/" />;
  }

  const onChange = (e) => setUserEmail(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    
    dispatch(sendResetPasswordEmail(userEmail));
  };


  return (
    <div className="wave-wrapper">
      {error && <p>error: {error}</p>}
      {loading && <p>Loading</p>}

      <div className="auth-container">
        <h1 className="title">Reset password</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <input
            type="email"
            className="input"
            placeholder="Email Adress"
            name="email"
            value={userEmail}
            onChange={onChange}
          />

          <button type="submit" className="button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
});

export default connect(mapStateToProps)(SendResetPassword);
