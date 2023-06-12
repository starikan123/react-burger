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
  ADD_BUN_TO_CONSTRUCTOR,
  RESET_ORDER,
  SET_INGREDIENT_FOR_DETAILS,
  REMOVE_CURRENT_INGREDIENT,
  MOVE_INGREDIENT,
} from "../actions/actionTypes";

const initialState = {
  ingredients: [],
  bun: null,
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
    case ADD_BUN_TO_CONSTRUCTOR:
      return {
        ...state,
        bun: action.payload,
      };
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (ingredient) => ingredient._id !== action.payload
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
