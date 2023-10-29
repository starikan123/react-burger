import {
  TBurgerConstructorActions,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REORDER_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from "../actions/burgerConstructor";
import {
  TBurgerIngredientsActions,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  IIngredient,
} from "../actions/burgerIngredients";

import { v4 as uuidv4 } from "uuid";

interface IBurgerConstructorState {
  constructorIngredients: Array<IIngredient & { uniqueId: string }>;
}

const initialState: IBurgerConstructorState = {
  constructorIngredients: [],
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions | TBurgerIngredientsActions
): IBurgerConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      if (action.ingredient.type === "bun") {
        const noExistingBun = state.constructorIngredients.filter(
          (ingredient) => ingredient.type !== "bun"
        );
        return {
          ...state,
          constructorIngredients: [
            ...noExistingBun,
            {
              ...action.ingredient,
              uniqueId: uuidv4(),
            },
          ],
        };
      } else {
        return {
          ...state,
          constructorIngredients: [
            ...state.constructorIngredients,
            {
              ...action.ingredient,
              uniqueId: uuidv4(),
            },
          ],
        };
      }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      const ingredientIsPresent = state.constructorIngredients.some(
        (ingredient) => ingredient.uniqueId === action.payload
      );

      if (ingredientIsPresent) {
        return {
          ...state,
          constructorIngredients: state.constructorIngredients.filter(
            (ingredient) => ingredient.uniqueId !== action.payload
          ),
        };
      } else {
        return state;
      }

    case REORDER_INGREDIENT:
      const { oldIndex, newIndex } = action.payload;
      const newState = [...state.constructorIngredients];
      const [movedItem] = newState.splice(oldIndex, 1);
      newState.splice(newIndex, 0, movedItem);
      return {
        ...state,
        constructorIngredients: newState,
      };
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [],
      };
    default:
      return state;
  }
};
