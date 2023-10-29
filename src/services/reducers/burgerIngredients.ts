import {
  TBurgerIngredientsActions,
  IIngredient,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAIL,
} from "../actions/burgerIngredients";

interface IBurgerIngredientsState {
  ingredients: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

const initialState: IBurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): IBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false,
      };
    case GET_INGREDIENTS_FAIL:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    default:
      return state;
  }
};
