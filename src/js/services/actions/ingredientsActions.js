import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
} from "./actionTypes";

export const getIngredients = () => (dispatch, getState, api) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });

  api
    .getIngredients()
    .then((data) => {
      const ingredients = data.map((ingredient) => ({
        ...ingredient,
        key: ingredient._id,
      }));

      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: ingredients });
    })
    .catch((error) => {
      dispatch({ type: GET_INGREDIENTS_FAILED, payload: error });
    });
};

export const setCurrentIngredient = (ingredient) => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient,
});

export const resetCurrentIngredient = () => ({
  type: RESET_CURRENT_INGREDIENT,
});
