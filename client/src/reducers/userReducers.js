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
  USER_LOAD_FAIL
} from "../constants/userConstants";

const userState = {
  loading: false,
  user: null,
  error: null,
};

export const userReducer = (state = userState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_LOAD_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case USER_LOAD_SUCCESS:
      return { loading: false, user: payload };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_LOAD_FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return { loading: false, user: null, error: null}
    default:
      return state;
  }
};
