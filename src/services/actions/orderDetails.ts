import { ThunkAction } from "redux-thunk";
import { RootState } from "../types/index";
import { useNavigate } from "react-router-dom";
import { api, checkResponse } from "../api";
import { getCookie } from "../utils";
import { IUser } from "./checkAuth";

export const SEND_ORDER_DETAILS = "SEND_ORDER_DETAILS" as const;
export const SEND_ORDER_DETAILS_SUCCESS = "SEND_ORDER_DETAILS_SUCCESS" as const;
export const SEND_ORDER_DETAILS_FAIL = "SEND_ORDER_DETAILS_FAIL" as const;

interface ISendOrderDetailsAction {
  type: typeof SEND_ORDER_DETAILS;
}

interface ISendOrderDetailsSuccessAction {
  type: typeof SEND_ORDER_DETAILS_SUCCESS;
  orderId: number;
}

interface ISendOrderDetailsFailAction {
  type: typeof SEND_ORDER_DETAILS_FAIL;
}

export type TOrderDetailsActions =
  | ISendOrderDetailsAction
  | ISendOrderDetailsSuccessAction
  | ISendOrderDetailsFailAction;

interface IOrderResponse {
  success: boolean;
  order: {
    number: number;
  };
}

export const getOrderDetails = (
  ingredientIds: string[],
  user: IUser | null,
  navigate: ReturnType<typeof useNavigate>
): ThunkAction<void, RootState, unknown, TOrderDetailsActions> => {
  return async (dispatch) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      dispatch({
        type: SEND_ORDER_DETAILS,
      });

      const token = getCookie("accessToken") || "";
      const response = await fetch(`${api}/orders`, {
        method: "POST",
        body: JSON.stringify({ ingredients: ingredientIds }),
        headers: {
          Authorization: token,
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const data = (await checkResponse(response)) as IOrderResponse;

      if (data && data.success) {
        dispatch({
          type: SEND_ORDER_DETAILS_SUCCESS,
          orderId: data.order.number,
        });
      } else {
        dispatch({
          type: SEND_ORDER_DETAILS_FAIL,
        });
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      dispatch({
        type: SEND_ORDER_DETAILS_FAIL,
      });
    }
  };
};
