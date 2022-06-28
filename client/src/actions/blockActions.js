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

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000/';

export const loadSubBlocks = (blockIds) => async (dispatch) => {
  try {
    dispatch({ type: SUB_BLOCKS_LOAD_REQUEST });
    const endpoints = blockIds.map(
      (id) => `${REACT_APP_SERVER_URL}api/block/${id}`
    );

    await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((data) => {
        const formatedData = data.map((item) => item.data.block);
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
      `${REACT_APP_SERVER_URL}api/block/${block._id}`
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
      (id) => `${REACT_APP_SERVER_URL}api/block/${id}`
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

export const addBlock = (block, parentBlock) => async (dispatch) => {
  try {
    dispatch({ type: BLOCK_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(
      `${REACT_APP_SERVER_URL}api/block/${block.userId}`,
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

    if (typeof parentBlock !== "undefined") {
      dispatch(
        loadBlock({
          ...parentBlock,
          blockContent: {
            ...parentBlock.blockContent,
            blocks: [...parentBlock.blockContent.blocks, data.data.block._id],
          },
        })
      );
    }

    return data.data.block._id;
  } catch (error) {
    console.log(error);
    dispatch({ type: BLOCK_ADD_FAIL });
  }
};

export const deleteBlock = (blockId, parentType) => async (dispatch) => {
  try {
    dispatch({ type: BLOCK_DELETE_REQUEST });
    const res = await axios.delete(
      `${REACT_APP_SERVER_URL}api/block/${blockId}`,
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
      `${REACT_APP_SERVER_URL}api/block/${blockId}`,
      { ...block },
      config
    );

    dispatch({
      type: BLOCK_UPDATE_SUCCESS,
      payload: data,
    });
    // console.log(data.data, block)

    // dispatch(loadBlock(data.data));
  } catch (error) {
    console.log(error);
    dispatch({ type: BLOCK_UPDATE_FAIL });
  }
};
