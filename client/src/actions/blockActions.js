import axios from "axios";
import {
  BLOCK_LOAD_REQUEST,
  BLOCK_LOAD_SUCCESS,
  BLOCK_LOAD_FAIL,
  BLOCKS_LOAD_REQUEST,
  BLOCKS_LOAD_SUCCESS,
  BLOCKS_LOAD_FAIL,
  BLOCK_ADD_REQUEST,
  BLOCK_ADD_SUCCESS,
  BLOCK_ADD_FAIL,
  BLOCK_UPDATE_REQUEST,
  BLOCK_UPDATE_SUCCESS,
  BLOCK_UPDATE_FAIL,
  BLOCK_DELETE_REQUEST,
  BLOCK_DELETE_SUCCESS,
  BLOCK_DELETE_FAIL,
  SUB_BLOCKS_LOAD_REQUEST,
  SUB_BLOCKS_LOAD_SUCCESS,
  SUB_BLOCKS_LOAD_FAIL,
} from "../constants/blockConstants";

export const loadSubBlocks = (blockIds) => async (dispatch) => {
  try {
    dispatch({ type: SUB_BLOCKS_LOAD_REQUEST });
    const endpoints = blockIds.map(
      (id) => `http://localhost:4000/api/block/${id}`
    );

    await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((data) => {
        const formatedData = data.map((item) => item.data.block);
        console.log(formatedData);
        dispatch({
          type: SUB_BLOCKS_LOAD_SUCCESS,
          payload: formatedData,
        });
      });
  } catch (error) {
    dispatch({ type: SUB_BLOCKS_LOAD_FAIL });
  }
};

export const loadBlock = (block) => async (dispatch) => {
  try {
    dispatch({ type: BLOCK_LOAD_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/block/${block._id}`
    );

    dispatch({
      type: BLOCK_LOAD_SUCCESS,
      payload: block,
    });
    dispatch(loadSubBlocks(block.blockContent.blocks));
  } catch (error) {
    dispatch({ type: BLOCK_LOAD_FAIL });
  }
};

export const loadBlocks = (blockIds) => async (dispatch) => {
  try {
    dispatch({ type: BLOCKS_LOAD_REQUEST });
    const endpoints = blockIds.map(
      (id) => `http://localhost:4000/api/block/${id}`
    );

    await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((data) => {
        const formatedData = data.map((item) => item.data.block);
        dispatch({
          type: BLOCKS_LOAD_SUCCESS,
          payload: formatedData,
        });
      });
  } catch (error) {
    dispatch({ type: BLOCKS_LOAD_FAIL });
  }
};

export const addBlock = (block) => async (dispatch) => {
  try {
    dispatch({ type: BLOCK_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(
      `http://localhost:4000/api/block/${block.userId}`,
      {
        parentId: block.parentId,
        userId: block.userId,
        blockName: block.blockName,
        blockType: block.blockType || "task",
        blockParent: block.blockParent,
        parentType: block.parentType,
      },
      config
    );

    dispatch({
      type: BLOCK_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: BLOCK_ADD_FAIL });
  }
};

export const deleteBlock = (blockId, parentType) => async (dispatch) => {
  try {
    dispatch({ type: BLOCK_DELETE_REQUEST });
    const res = await axios.delete(
      `http://localhost:4000/api/block/${blockId}`,
      {
        data: {
          parentType: parentType,
        },
      }
    );

    dispatch({
      type: BLOCK_DELETE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: BLOCK_DELETE_FAIL });
  }
};

export const updateBlock = (block, blockId) => async (dispatch) => {
  try {
    dispatch({ type: BLOCK_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.patch(
      `http://localhost:4000/api/block/${blockId}`,
      { ...block },
      config
    );

    dispatch({
      type: BLOCK_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch(loadBlock(blockId));
  } catch (error) {
    dispatch({ type: BLOCK_UPDATE_FAIL });
  }
};
