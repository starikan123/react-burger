import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  RESET_ORDER,
} from "./actionTypes";

export const placeOrder = (ingredients) => async (dispatch, getState, api) => {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    dispatch({
      type: PLACE_ORDER_FAILED,
      payload: new Error("Invalid ingredients"),
    });
    return;
  }

  const { orderLoading } = getState().burger;
  if (orderLoading) return;

  dispatch({ type: PLACE_ORDER_REQUEST });

  try {
    const data = await api.createOrder(ingredients);
    if (data && data.success) {
      dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
    } else {
      dispatch({
        type: PLACE_ORDER_FAILED,
        payload: new Error("Unsuccessful API response"),
      });
    }
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILED, payload: error });
  }
};

export const resetOrder = () => ({
  type: RESET_ORDER,
});
