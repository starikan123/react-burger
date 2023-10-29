import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../types/index";
import { api, checkResponse } from "../api";
import { IApiResponse } from "../api";

export const GET_ORDER_DESCRIPTION = "GET_ORDER_DESCRIPTION" as const;
export const GET_ORDER_DESCRIPTION_SUCCESS =
  "GET_ORDER_DESCRIPTION_SUCCESS" as const;
export const GET_ORDER_DESCRIPTION_FAIL = "GET_ORDER_DESCRIPTION_FAIL" as const;

interface IOrderDetailsApiResponse extends IApiResponse {
  orders: IOrder[];
}

export interface IOrder {
  [key: string]: any;
}

interface IGetOrderDescriptionAction {
  type: typeof GET_ORDER_DESCRIPTION;
}

interface IGetOrderDescriptionSuccessAction {
  type: typeof GET_ORDER_DESCRIPTION_SUCCESS;
  payload: IOrder;
}

interface IGetOrderDescriptionFailAction {
  type: typeof GET_ORDER_DESCRIPTION_FAIL;
  payload: string;
}

export type TOrderDescriptionActions =
  | IGetOrderDescriptionAction
  | IGetOrderDescriptionSuccessAction
  | IGetOrderDescriptionFailAction;

export const fetchOrderDetails = (
  orderNumber: string
): ThunkAction<void, RootState, unknown, TOrderDescriptionActions> => {
  return async (dispatch: Dispatch<TOrderDescriptionActions>) => {
    dispatch({ type: GET_ORDER_DESCRIPTION });
    try {
      const response = await fetch(`${api}/orders/${orderNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await checkResponse(response)) as IOrderDetailsApiResponse;
      if (data && data.success) {
        dispatch({
          type: GET_ORDER_DESCRIPTION_SUCCESS,
          payload: data.orders[0],
        });
        return data.orders[0];
      } else {
        throw new Error(data.message || "Fetching order details failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: GET_ORDER_DESCRIPTION_FAIL, payload: errorMessage });
    }
  };
};
