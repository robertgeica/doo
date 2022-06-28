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
  RESET_PASSWORD_FAIL,
} from "../constants/userConstants";

const userState = {
  loading: false,
  user: null,
  error: null,
  email: null,
  resetPassword: null,
};

export const userReducer = (state = userState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_LOAD_REQUEST:
    case SEND_RESET_PASSWORD_EMAIL_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false };
      
    case USER_LOGIN_SUCCESS:
    case USER_LOAD_SUCCESS:
      return { loading: false, user: payload };

    case SEND_RESET_PASSWORD_EMAIL_SUCCESS:
      return { ...state, loading: false, email: payload };

    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, resetPassword: payload };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_LOAD_FAIL:
    case SEND_RESET_PASSWORD_EMAIL_FAIL:
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: payload };

    case USER_LOGOUT:
      return { loading: false, user: null, error: null };
    default:
      return state;
  }
};
