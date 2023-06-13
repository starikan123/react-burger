import {
  REMOVE_CURRENT_INGREDIENT,
  SET_INGREDIENT_FOR_DETAILS,
} from "./actionTypes";

export const removeCurrentIngredient = () => ({
  type: REMOVE_CURRENT_INGREDIENT,
});

export const setIngredientForDetails = (ingredient) => ({
  type: SET_INGREDIENT_FOR_DETAILS,
  payload: ingredient,
});
