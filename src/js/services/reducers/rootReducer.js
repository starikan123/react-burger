import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { burgerReducer } from "./burgerReducer";
import { authReducer } from "./authReducer";
import { orderItemDetailsReducer } from "./orderItemDetailsReducer";
import { feedReducer } from "./feedReducer";
import { ordersHistoryReducer } from "./ordersHistoryReducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burger: burgerReducer,
  auth: authReducer,
  orderItemDetails: orderItemDetailsReducer,
  feed: feedReducer,
  ordersHistory: ordersHistoryReducer,
});

export default rootReducer;
