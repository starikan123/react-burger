import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { burgerReducer } from "./burgerReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burger: burgerReducer,
  auth: authReducer,
});

export default rootReducer;
