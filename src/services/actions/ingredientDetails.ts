import { Dispatch } from "redux";
import { api, checkResponse } from "../api";

export const SAVE_CURRENT_INGREDIENT_DETAILS =
  "SAVE_CURRENT_INGREDIENT_DETAILS" as const;
export const REMOVE_CURRENT_INGREDIENT_DETAILS =
  "REMOVE_CURRENT_INGREDIENT_DETAILS" as const;
export const GET_INGREDIENT_DETAILS = "GET_INGREDIENT_DETAILS" as const;
export const GET_INGREDIENT_DETAILS_SUCCESS =
  "GET_INGREDIENT_DETAILS_SUCCESS" as const;
export const GET_INGREDIENT_DETAILS_FAIL =
  "GET_INGREDIENT_DETAILS_FAIL" as const;

export interface IIngredientDetails {
  _id: string;
  [key: string]: any;
}

interface ISaveCurrentIngredientDetailsAction {
  type: typeof SAVE_CURRENT_INGREDIENT_DETAILS;
  payload: IIngredientDetails;
}

interface IRemoveCurrentIngredientDetailsAction {
  type: typeof REMOVE_CURRENT_INGREDIENT_DETAILS;
}

interface IGetIngredientDetailsAction {
  type: typeof GET_INGREDIENT_DETAILS;
}

interface IGetIngredientDetailsSuccessAction {
  type: typeof GET_INGREDIENT_DETAILS_SUCCESS;
  payload: IIngredientDetails;
}

interface IGetIngredientDetailsFailAction {
  type: typeof GET_INGREDIENT_DETAILS_FAIL;
}

export type TIngredientDetailsActions =
  | ISaveCurrentIngredientDetailsAction
  | IRemoveCurrentIngredientDetailsAction
  | IGetIngredientDetailsAction
  | IGetIngredientDetailsSuccessAction
  | IGetIngredientDetailsFailAction;

export const saveCurrentIngredientDetails = (
  ingredient: IIngredientDetails
): ISaveCurrentIngredientDetailsAction => ({
  type: SAVE_CURRENT_INGREDIENT_DETAILS,
  payload: ingredient,
});

export const fetchIngredientDetails = (id: string) => {
  return function (dispatch: Dispatch<TIngredientDetailsActions>) {
    dispatch({
      type: GET_INGREDIENT_DETAILS,
    });
    fetch(`${api}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        if (res && res.success && Array.isArray(res.data)) {
          const ingredientDetails = res.data.find(
            (item: IIngredientDetails) => item._id === id
          );
          if (ingredientDetails) {
            dispatch({
              type: GET_INGREDIENT_DETAILS_SUCCESS,
              payload: ingredientDetails,
            });
          } else {
            dispatch({
              type: GET_INGREDIENT_DETAILS_FAIL,
            });
          }
        } else {
          dispatch({
            type: GET_INGREDIENT_DETAILS_FAIL,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENT_DETAILS_FAIL,
        });
      });
  };
};
