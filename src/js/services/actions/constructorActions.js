import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT,
  ADD_BUN_TO_CONSTRUCTOR,
  MOVE_INGREDIENT,
} from "./actionTypes";

export function addIngredientToConstructor(ingredient) {
  return (dispatch) => {
    if (ingredient.type === "bun") {
      console.log("Dispatching: ADD_BUN_TO_CONSTRUCTOR", ingredient);
      dispatch({
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: ingredient,
      });
    } else {
      console.log("Dispatching: ADD_INGREDIENT_TO_CONSTRUCTOR", ingredient);
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: ingredient,
      });
    }
  };
}

export const removeIngredient = (ingredientId) => {
  console.log("Dispatching: REMOVE_INGREDIENT", ingredientId);
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredientId,
  };
};

export const moveIngredient = (dragIndex, hoverIndex) => {
  console.log("Dispatching: MOVE_INGREDIENT", { dragIndex, hoverIndex });
  return {
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  };
};
