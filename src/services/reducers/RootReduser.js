import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientDetailsReducer } from "./ingredientDetails";
import { orderDetailsReducer } from "./orderDetails";
import { forgotPasswordFormReducer } from "./forgotPasswordForm";
import { resetPasswordFormReducer } from "./resetPasswordForm";
import { registerUserReducer } from "./registerForm";
import { loginReducer } from "./loginForm";
import { profileFormReducer } from "./profileForm";
import { AuthReducer } from "./Auth";
import { wsReducer } from "./wsReducer";
import { orderDescriptionReducer } from "./orderDescription";

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  forgotPasswordForm: forgotPasswordFormReducer,
  resetPasswordForm: resetPasswordFormReducer,
  registerUser: registerUserReducer,
  login: loginReducer,
  profileForm: profileFormReducer,
  Auth: AuthReducer,
  ws: wsReducer,
  orderDescription: orderDescriptionReducer,
});

export default rootReducer;
