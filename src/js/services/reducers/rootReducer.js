import { combineReducers } from "redux";
import { burgerReducer } from "./reducers";

const rootReducer = combineReducers({
  burger: burgerReducer,
});

export default rootReducer;
