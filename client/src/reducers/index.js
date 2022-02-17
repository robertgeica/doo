import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { workplaceReducer } from "./workplaceReducers";

export default combineReducers({
  userReducer: userReducer,
  workplaceReducer: workplaceReducer
});