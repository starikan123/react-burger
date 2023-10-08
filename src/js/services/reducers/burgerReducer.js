import {
  SET_INGREDIENT_FOR_DETAILS,
  REMOVE_CURRENT_INGREDIENT,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT,
  ADD_BUN_TO_CONSTRUCTOR,
  MOVE_INGREDIENT,
  CLEAR_BURGER_CONSTRUCTOR,
} from "../actions/actionTypes";

const initialState = {
  currentIngredient: null,
  bun: null,
  selectedIngredients: [],
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: null };
    case SET_INGREDIENT_FOR_DETAILS:
      return { ...state, currentIngredient: action.payload };
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    case ADD_BUN_TO_CONSTRUCTOR:
      return {
        ...state,
        bun: action.payload,
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (ingredient) => ingredient.uniqueId !== action.payload.uniqueId
        ),
      };

    case MOVE_INGREDIENT: {
      const { dragIndex, hoverIndex } = action.payload;
      const newSelectedIngredients = [...state.selectedIngredients];
      const draggedIngredient = newSelectedIngredients[dragIndex];

      newSelectedIngredients.splice(dragIndex, 1);
      newSelectedIngredients.splice(hoverIndex, 0, draggedIngredient);

      return { ...state, selectedIngredients: newSelectedIngredients };
    }
    case CLEAR_BURGER_CONSTRUCTOR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
