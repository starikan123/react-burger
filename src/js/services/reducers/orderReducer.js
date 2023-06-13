import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  RESET_ORDER,
} from "../actions/actionTypes";

const initialState = {
  order: null,
  orderNumber: null,
  orderLoading: false,
  orderError: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
