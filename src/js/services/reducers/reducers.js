import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT,
  RESET_ORDER,
  SET_INGREDIENT_FOR_DETAILS,
  REMOVE_CURRENT_INGREDIENT,
} from "../actions/actionTypes";

const initialState = {
  ingredients: [],
  currentIngredient: null,
  order: null,
  orderNumber: null,
  ingredientsLoading: false,
  ingredientsError: null,
  orderLoading: false,
  orderError: null,
  totalPrice: 0,
  selectedIngredients: [],
};

export const burgerReducer = (state = initialState, action) => {
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
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      const newIngredients = action.payload.filter((ingredient) => {
        return !state.selectedIngredients.some(
          (selectedIngredient) => selectedIngredient._id === ingredient._id
        );
      });

      let newSelectedIngredients = [];

      if (newIngredients.length > 0) {
        if (newIngredients[0].type === "bun") {
          newSelectedIngredients = [
            newIngredients[0],
            ...state.selectedIngredients.filter(
              (ingredient) => ingredient.type !== "bun"
            ),
          ];
        } else {
          newSelectedIngredients = [
            ...state.selectedIngredients,
            ...newIngredients,
          ];
        }
      } else {
        newSelectedIngredients = state.selectedIngredients;
      }

      const newPrice = newSelectedIngredients.reduce((acc, ingredient) => {
        return acc + ingredient.price;
      }, 0);

      return {
        ...state,
        selectedIngredients: newSelectedIngredients,
        totalPrice: newPrice,
      };

    case REMOVE_INGREDIENT:
      const removedIngredient = state.ingredients[action.payload];
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item, idx) => idx !== action.payload
        ),
        selectedIngredients: state.selectedIngredients.filter(
          (ingredient) => ingredient._id !== removedIngredient._id
        ),
        totalPrice: state.totalPrice - removedIngredient.price,
      };

    case SET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: action.payload };
    case RESET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: null };
    case PLACE_ORDER_REQUEST:
      return { ...state, orderLoading: true };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        order: action.payload,
        orderNumber: action.payload.order.number,
      };
    case PLACE_ORDER_FAILED:
      return { ...state, orderLoading: false, orderError: action.payload };
    case RESET_ORDER:
      return {
        ...state,
        selectedIngredients: [],
        totalPrice: 0,
        order: null,
        orderNumber: null,
      };
    case SET_INGREDIENT_FOR_DETAILS:
      return { ...state, currentIngredient: action.payload };
    case REMOVE_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: null };
    default:
      return state;
  }
};
