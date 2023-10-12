import { SET_CURRENT_ORDER_DETAILS } from "./actionTypes";

export const setCurrentOrderDetails = (currentOrder) => ({
  type: SET_CURRENT_ORDER_DETAILS,
  payload: currentOrder,
});

export const fetchCurrentOrderDetails = (currentItem) => (dispatch) => {
  dispatch(setCurrentOrderDetails(currentItem));
};
