import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../types";
import { api, checkResponse } from "../api";
import { getCookie } from "../utils";

export const PASSWORD_RESET = "REQUEST_PASSWORD_RESET" as const;
export const PASSWORD_RESET_SUCCESS = "REQUEST_PASSWORD_RESET_SUCCESS" as const;
export const PASSWORD_RESET_FAIL = "REQUEST_PASSWORD_RESET_FAIL" as const;

interface IPasswordResetAction {
  type: typeof PASSWORD_RESET;
}

interface IPasswordResetSuccessAction {
  type: typeof PASSWORD_RESET_SUCCESS;
}

interface IPasswordResetFailAction {
  type: typeof PASSWORD_RESET_FAIL;
}

export type TResetPasswordActions =
  | IPasswordResetAction
  | IPasswordResetSuccessAction
  | IPasswordResetFailAction;

export const resetPassword: ActionCreator<
  ThunkAction<Promise<void>, RootState, null, TResetPasswordActions>
> = (password: string, token: string) => async (dispatch) => {
  dispatch({
    type: PASSWORD_RESET,
  });

  try {
    const response = await fetch(`${api}/password-reset/reset`, {
      method: "POST",
      body: JSON.stringify({
        password,
        token,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });

    const data = await checkResponse(response);

    if (data && data.success) {
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
      });
    } else {
      dispatch({
        type: PASSWORD_RESET_FAIL,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};
