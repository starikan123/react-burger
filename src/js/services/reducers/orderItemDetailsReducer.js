import { SET_CURRENT_ORDER_DETAILS } from "../actions/actionTypes";

const initialState = {
  currentOrder: {},
};

export const orderItemDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER_DETAILS:
      return { ...state, currentOrder: action.payload };
    default:
      return state;
  }
};
