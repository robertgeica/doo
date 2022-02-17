import {
  WORKPLACE_LOAD_REQUEST,
  WORKPLACE_LOAD_SUCCESS,
  WORKPLACE_LOAD_FAIL,
  WORKPLACES_LOAD_REQUEST,
  WORKPLACES_LOAD_SUCCESS,
  WORKPLACES_LOAD_FAIL,
  WORKPLACE_ADD_REQUEST,
  WORKPLACE_ADD_FAIL,
  WORKPLACE_UPDATE_REQUEST,
  WORKPLACE_UPDATE_FAIL,
  WORKPLACE_DELETE_REQUEST,
  WORKPLACE_DELETE_FAIL,
} from "../constants/workplaceConstants";

const workplaceState = {
  loading: false,
  error: null,
  workplace: null,
  workplaces: null,
};

export const workplaceReducer = (state = workplaceState, action) => {
  const { type, payload } = action;

  switch (type) {
    case WORKPLACE_LOAD_REQUEST:
    case WORKPLACES_LOAD_REQUEST:
    case WORKPLACE_ADD_REQUEST:
    case WORKPLACE_DELETE_REQUEST:
    case WORKPLACE_UPDATE_REQUEST:
      return { ...state, loading: true };

    case WORKPLACE_LOAD_SUCCESS:
      return { ...state, loading: false, workplace: payload };

    case WORKPLACES_LOAD_SUCCESS:
      return { ...state, loading: false, workplaces: payload };

    case WORKPLACE_LOAD_FAIL:
    case WORKPLACES_LOAD_FAIL:
    case WORKPLACE_ADD_FAIL:
    case WORKPLACE_DELETE_FAIL:
    case WORKPLACE_UPDATE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
