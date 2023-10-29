import { ActionCreator } from "redux";

export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR =
  "REMOVE_INGREDIENT_FROM_CONSTRUCTOR" as const;
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR" as const;
export const REORDER_INGREDIENT = "REORDER_INGREDIENT" as const;

export interface IRemoveIngredientFromConstructorAction {
  type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  payload: string;
}

export interface IReorderIngredientAction {
  type: typeof REORDER_INGREDIENT;
  payload: { oldIndex: number; newIndex: number };
}

export interface IClearConstructorAction {
  type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
  | IRemoveIngredientFromConstructorAction
  | IReorderIngredientAction
  | IClearConstructorAction;

export const removeIngredientFromConstructor: ActionCreator<
  IRemoveIngredientFromConstructorAction
> = (uniqueId: string) => {
  return {
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: uniqueId,
  };
};

export const reorderIngredient: ActionCreator<IReorderIngredientAction> = (
  oldIndex: number,
  newIndex: number
) => {
  return {
    type: REORDER_INGREDIENT,
    payload: { oldIndex, newIndex },
  };
};

export const clearConstructor: ActionCreator<IClearConstructorAction> = () => ({
  type: CLEAR_CONSTRUCTOR,
});
