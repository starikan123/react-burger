import {
  TIngredientDetailsActions,
  GET_INGREDIENT_DETAILS,
  GET_INGREDIENT_DETAILS_SUCCESS,
  GET_INGREDIENT_DETAILS_FAIL,
  IIngredientDetails,
} from "../actions/ingredientDetails";

interface IIngredientDetailsState {
  ingredient: IIngredientDetails | null;
  ingredientDetailsRequest: boolean;
  ingredientDetailsRequestFail: boolean;
}

const initialState: IIngredientDetailsState = {
  ingredient: null,
  ingredientDetailsRequest: false,
  ingredientDetailsRequestFail: false,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsActions
): IIngredientDetailsState => {
  switch (action.type) {
    case GET_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredientDetailsRequest: true,
      };
    case GET_INGREDIENT_DETAILS_SUCCESS:
      return {
        ...state,
        ingredient: action.payload,
        ingredientDetailsRequest: false,
        ingredientDetailsRequestFail: false,
      };
    case GET_INGREDIENT_DETAILS_FAIL:
      return {
        ...state,
        ingredientDetailsRequestFail: true,
      };
    default:
      return state;
  }
};
