import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  SEND_RESET_PASSWORD_EMAIL_REQUEST,
  SEND_RESET_PASSWORD_EMAIL_SUCCESS,
  SEND_RESET_PASSWORD_EMAIL_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "../constants/userConstants";
import setAuthToken from "../utils/setAuthToken";

const url = process.env.URL || 'http://localhost:4000';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    dispatch({ type: USER_LOAD_REQUEST });

    const { data } = await axios.get(`${url}/api/user`);

    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL });
    localStorage.removeItem("token");

  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${url}/api/user/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("token", data.token);

    dispatch(loadUser());
  } catch (error) {
    console.log(error, error.response)
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${url}/api/user/register`,
      { username, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: USER_LOGOUT });
};

export const sendResetPasswordEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_RESET_PASSWORD_EMAIL_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.patch(`${url}/api/user/resetpassword`, {email}, config);

    dispatch({
      type: SEND_RESET_PASSWORD_EMAIL_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: SEND_RESET_PASSWORD_EMAIL_FAIL });
  }
}

export const resetPassword = (id, token, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.patch(`${url}/api/user/resetpassword/${id}/${token}`, {password: newPassword}, config);

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL });
  }
}