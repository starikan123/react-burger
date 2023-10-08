import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT,
  ADD_BUN_TO_CONSTRUCTOR,
  MOVE_INGREDIENT,
  CLEAR_BURGER_CONSTRUCTOR,
} from "./actionTypes";

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

export const removeIngredient = (uniqueId) => ({
  type: REMOVE_INGREDIENT,
  payload: { uniqueId },
});

export const moveIngredient = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  };
};

export const clearBurgerConstructor = () => {
  return {
    type: CLEAR_BURGER_CONSTRUCTOR,
  };
};
