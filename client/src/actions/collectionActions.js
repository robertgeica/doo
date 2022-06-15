import axios from "axios";
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

// load collection
export const loadCollection = (id) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_LOAD_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/collection/${id}`
    );
    dispatch({
      type: COLLECTION_LOAD_SUCCESS,
      payload: data.collection,
    });
  } catch (error) {
    dispatch({ type: COLLECTION_LOAD_FAIL });
  }
};

// load collections
export const loadCollections = (userCollections) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTIONS_LOAD_REQUEST });
    const data = userCollections.map((collection) => {
      return { collectionId: collection.collectionId, name: collection.name };
    });

    dispatch({
      type: COLLECTIONS_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: COLLECTIONS_LOAD_FAIL });
  }
};

// add collection
export const addCollection = (collection, userId) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      `http://localhost:4000/api/collection/${userId}`,
      { ...collection.collection },
      config
    );

    dispatch({
      type: COLLECTION_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: COLLECTION_ADD_FAIL });
  }
};
// delete collection
export const deleteCollection = (collectionId) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_DELETE_REQUEST });
    const res = await axios.delete(
      `http://localhost:4000/api/collection/${collectionId}`
    );

    dispatch({
      type: COLLECTION_DELETE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: COLLECTION_DELETE_FAIL });
  }
};
// update collection
export const updateCollection = (collection, collectionId) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.patch(
      `http://localhost:4000/api/collection/${collectionId}`,
      { ...collection },
      config
    );

    dispatch({
      type: COLLECTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: COLLECTION_UPDATE_FAIL });
  }
};