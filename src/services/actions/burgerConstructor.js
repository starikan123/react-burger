export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR =
  "REMOVE_INGREDIENT_FROM_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const REORDER_INGREDIENT = "REORDER_INGREDIENT";

export const removeIngredientFromConstructor = (uniqueId) => {
  return function (dispatch) {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: uniqueId,
    });
  };
};

export const reorderIngredient = (oldIndex, newIndex) => {
  return {
    type: REORDER_INGREDIENT,
    payload: { oldIndex, newIndex },
  };
};

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR,
});
