import axios from "axios";
import {
  WORKPLACE_LOAD_REQUEST,
  WORKPLACE_LOAD_SUCCESS,
  WORKPLACE_LOAD_FAIL,
  WORKPLACES_LOAD_REQUEST,
  WORKPLACES_LOAD_SUCCESS,
  WORKPLACES_LOAD_FAIL,
  WORKPLACE_ADD_REQUEST,
  WORKPLACE_ADD_SUCCESS,
  WORKPLACE_ADD_FAIL,
  WORKPLACE_UPDATE_REQUEST,
  WORKPLACE_UPDATE_SUCCESS,
  WORKPLACE_UPDATE_FAIL,
  WORKPLACE_DELETE_REQUEST,
  WORKPLACE_DELETE_SUCCESS,
  WORKPLACE_DELETE_FAIL,
} from "../constants/workplaceConstants";
import { loadUser } from "./userActions";
export const loadWorkplace = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORKPLACE_LOAD_REQUEST });

    const { data } = await axios.get(
      `${url}/api/workplace/${id}`
    );

    dispatch({
      type: WORKPLACE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: WORKPLACE_LOAD_FAIL });
  }
};

export const loadWorkplaces = (userWorkplaces) => async (dispatch) => {
  
  try {
    dispatch({ type: WORKPLACES_LOAD_REQUEST });
    const data = userWorkplaces.map((workplace) => {
      return { workplaceId: workplace.workplaceId, name: workplace.name };
    });

    dispatch({
      type: WORKPLACES_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: WORKPLACES_LOAD_FAIL });
  }
};

export const addWorkplace = (workplace, userId) => async (dispatch) => {
  try {
    dispatch({ type: WORKPLACE_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      `${url}/api/workplace/${userId}`,
      { ...workplace.workplace },
      config
    );

    dispatch({
      type: WORKPLACE_ADD_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: WORKPLACE_ADD_FAIL });
  }
};

export const deleteWorkplace = (workplaceId) => async (dispatch) => {
  try {
    dispatch({ type: WORKPLACE_DELETE_REQUEST });
    const res = await axios.delete(
      `${url}/api/workplace/${workplaceId}`
    );

    dispatch({
      type: WORKPLACE_DELETE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: WORKPLACE_DELETE_FAIL });
  }
};

export const updateWorkplace = (workplace, workplaceId) => async (dispatch) => {
  try {
    dispatch({ type: WORKPLACE_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.patch(
      `${url}/api/workplace/${workplaceId}`,
      { ...workplace },
      config
    );

    dispatch({
      type: WORKPLACE_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: WORKPLACE_UPDATE_FAIL });
  }
};
