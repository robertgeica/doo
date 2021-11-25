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
  USER_LOAD_FAIL
} from "../constants/userConstants";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  try {
    dispatch({ type: USER_LOAD_REQUEST });

    const { data } = await axios.get("http://localhost:4000/api/user");

    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL });
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
      "http://localhost:4000/api/user/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL });
  }
};
