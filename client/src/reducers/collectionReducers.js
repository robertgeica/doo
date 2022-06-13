import {
  COLLECTION_LOAD_REQUEST,
  COLLECTION_LOAD_SUCCESS,
  COLLECTION_LOAD_FAIL,
  COLLECTIONS_LOAD_REQUEST,
  COLLECTIONS_LOAD_SUCCESS,
  COLLECTIONS_LOAD_FAIL,
  COLLECTION_ADD_REQUEST,
  COLLECTION_ADD_SUCCESS,
  COLLECTION_ADD_FAIL,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAIL,
} from "../constants/collectionConstants";

const collectionState = {
  loading: false,
  error: null,
  collection: null,
  collections: null,
};

export const collectionReducer = (state = collectionState, action) => {
  const { type, payload } = action;

  switch (type) {
    case COLLECTION_LOAD_REQUEST:
    case COLLECTIONS_LOAD_REQUEST:
    case COLLECTION_ADD_REQUEST:
    case COLLECTION_DELETE_REQUEST:
    case COLLECTION_UPDATE_REQUEST:
      return { ...state, loading: true };

    case COLLECTION_LOAD_SUCCESS:
      return { ...state, loading: false, collection: payload };

    case COLLECTIONS_LOAD_SUCCESS:
      return { ...state, loading: false, collections: payload };

    case COLLECTION_LOAD_FAIL:
    case COLLECTIONS_LOAD_FAIL:
    case COLLECTION_ADD_FAIL:
    case COLLECTION_DELETE_FAIL:
    case COLLECTION_UPDATE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
