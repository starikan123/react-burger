import { Dispatch } from "redux";
import { api, checkResponse } from "../api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST" as const;
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS" as const;
export const GET_INGREDIENTS_FAIL = "GET_INGREDIENTS_FAIL" as const;
export const ADD_INGREDIENT_TO_CONSTRUCTOR =
  "ADD_INGREDIENT_TO_CONSTRUCTOR" as const;

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
}

interface IGetIngredientsApiResponse {
  success: boolean;
  data: IIngredient[];
}

export interface IGetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: IIngredient[];
}

export interface IGetIngredientsFailAction {
  type: typeof GET_INGREDIENTS_FAIL;
}

export interface IAddIngredientToConstructorAction {
  type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  ingredient: IIngredient;
}

export type TBurgerIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailAction
  | IAddIngredientToConstructorAction;

export const getIngredients = () => {
  return function (dispatch: Dispatch<TBurgerIngredientsActions>) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    fetch(`${api}/ingredients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data: IGetIngredientsApiResponse) => {
        if (data && data.success) {
          dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: data.data });
        } else {
          dispatch({ type: GET_INGREDIENTS_FAIL });
        }
      })
      .catch(() => {
        dispatch({ type: GET_INGREDIENTS_FAIL });
      });
  };
};

export const addIngredientToConstructor = (
  ingredient: IIngredient
): IAddIngredientToConstructorAction => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  ingredient,
});
