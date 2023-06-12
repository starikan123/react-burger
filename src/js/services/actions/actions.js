import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  REMOVE_INGREDIENT,
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  RESET_ORDER,
  SET_INGREDIENT_FOR_DETAILS,
  REMOVE_CURRENT_INGREDIENT,
  ADD_BUN_TO_CONSTRUCTOR,
  MOVE_INGREDIENT,
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

export const removeIngredient = (ingredientId) => ({
  type: REMOVE_INGREDIENT,
  payload: ingredientId,
});

export const moveIngredient = (dragIndex, hoverIndex) => ({
  type: MOVE_INGREDIENT,
  payload: { dragIndex, hoverIndex },
});

export const setCurrentIngredient = (ingredient) => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient,
});

export const resetCurrentIngredient = () => ({
  type: RESET_CURRENT_INGREDIENT,
});

export const resetOrder = () => ({
  type: RESET_ORDER,
});

export const setIngredientForDetails = (ingredient) => ({
  type: SET_INGREDIENT_FOR_DETAILS,
  payload: ingredient,
});

export const removeCurrentIngredient = () => ({
  type: REMOVE_CURRENT_INGREDIENT,
});

export function addIngredientToConstructor(ingredient) {
  return (dispatch) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: ingredient,
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: ingredient,
      });
    }
  };
}

export const placeOrder = (ingredients) => async (dispatch, getState, api) => {
  const { orderLoading } = getState().burger;

  if (orderLoading) {
    return;
  }

  dispatch({ type: PLACE_ORDER_REQUEST });

  try {
    const data = await api.createOrder(ingredients);
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILED, payload: error });
  }
};
