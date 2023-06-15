import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  RESET_ORDER,
} from "./actionTypes";

export const placeOrder = (ingredients) => async (dispatch, getState, api) => {
  const { orderLoading } = getState().burger;

  if (orderLoading) {
    return;
  }

  dispatch({ type: PLACE_ORDER_REQUEST });

  try {
    const data = await api.createOrder(ingredients);
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILED, payload: error });
  }
};

export const resetOrder = () => ({
  type: RESET_ORDER,
});
