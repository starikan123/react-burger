import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
} from "../actions/actionTypes";

const initialState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: null,
  currentIngredient: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsLoading: true };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsLoading: false,
        ingredients: action.payload,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsLoading: false,
        ingredientsError: action.payload,
      };
    case SET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: action.payload };
    case RESET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: null };
    default:
      return state;
  }
};
