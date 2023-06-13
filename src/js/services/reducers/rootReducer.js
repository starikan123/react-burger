import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { burgerReducer } from "./burgerReducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burger: burgerReducer,
});

export default rootReducer;
