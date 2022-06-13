import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { workplaceReducer } from "./workplaceReducers";
import { collectionReducer } from './collectionReducers';
import { blockReducer } from './blockReducers';

export default combineReducers({
  userReducer: userReducer,
  workplaceReducer: workplaceReducer,
  collectionReducer: collectionReducer,
  blockReducer: blockReducer
});