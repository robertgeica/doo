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

const blockState = {
  loading: false,
  error: null,
  block: null,
  blocks: null,
  subBlocks: null,
};

export const blockReducer = (state = blockState, action) => {
  const { type, payload } = action;

  switch (type) {
    case BLOCK_LOAD_REQUEST:
    case BLOCKS_LOAD_REQUEST:
    case BLOCK_ADD_REQUEST:
    case BLOCK_DELETE_REQUEST:
    case BLOCK_UPDATE_REQUEST:
    case SUB_BLOCKS_LOAD_REQUEST:
      return { ...state, loading: true };

    case BLOCK_LOAD_SUCCESS:
      return { ...state, loading: false, block: payload };

    case BLOCKS_LOAD_SUCCESS:
      return { ...state, loading: false, blocks: payload };

    case SUB_BLOCKS_LOAD_SUCCESS:
      return { ...state, loading: false, subBlocks: payload };

    case BLOCK_LOAD_FAIL:
    case BLOCKS_LOAD_FAIL:
    case BLOCK_ADD_FAIL:
    case BLOCK_DELETE_FAIL:
    case BLOCK_UPDATE_FAIL:
    case SUB_BLOCKS_LOAD_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
