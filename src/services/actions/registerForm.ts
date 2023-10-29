import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../types";
import { api, checkResponse, IApiResponse } from "../api";

export const REGISTER_USER = "REGISTER_USER" as const;
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS" as const;
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL" as const;

interface IRegisterUserAction {
  type: typeof REGISTER_USER;
}

interface IRegisterUserSuccessAction {
  type: typeof REGISTER_USER_SUCCESS;
  payload: IApiResponse;
}

interface IRegisterUserFailAction {
  type: typeof REGISTER_USER_FAIL;
}

export type TRegisterActions =
  | IRegisterUserAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailAction;

export const registerUser =
  (
    email: string,
    password: string,
    name: string
  ): ThunkAction<Promise<void>, RootState, null, Action<string>> =>
  async (dispatch) => {
    dispatch({
      type: REGISTER_USER,
    });

    try {
      const response = await fetch(`${api}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const data: IApiResponse = await checkResponse(response);

      if (data && data.success) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: REGISTER_USER_FAIL,
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: REGISTER_USER_FAIL,
      });
    }
  };
