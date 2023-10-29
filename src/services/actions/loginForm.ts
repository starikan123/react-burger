import { api, checkResponse, checkUserAuth } from "../api";
import { setCookie } from "../utils";
import { AppDispatch } from "../../index";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../types/index";
import { Action } from "redux";
import { useNavigate } from "react-router-dom";

export const LOGIN_ATTEMPT = "LOGIN_ATTEMPT" as const;
export const LOGIN_ATTEMPT_SUCCESS = "LOGIN_ATTEMPT_SUCCESS" as const;
export const LOGIN_ATTEMPT_FAIL = "LOGIN_ATTEMPT_FAIL" as const;

interface ILoginAttemptAction {
  type: typeof LOGIN_ATTEMPT;
}

interface ILoginAttemptSuccessAction {
  type: typeof LOGIN_ATTEMPT_SUCCESS;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ILoginAttemptFailAction {
  type: typeof LOGIN_ATTEMPT_FAIL;
}

export type TLoginFormActions =
  | ILoginAttemptAction
  | ILoginAttemptSuccessAction
  | ILoginAttemptFailAction;

export const loginRequest =
  (
    email: string,
    password: string,
    navigate: ReturnType<typeof useNavigate>
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: LOGIN_ATTEMPT,
    });

    try {
      const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          email,
          password,
        }),
      }).then(checkResponse);

      if (res && res.success) {
        if (res.accessToken && res.refreshToken) {
          setCookie("accessToken", res.accessToken, { expires: 12000 });
          setCookie("refreshToken", res.refreshToken, { expires: 86400 });
          dispatch({
            type: LOGIN_ATTEMPT_SUCCESS,
            payload: res,
          });
          dispatch(checkUserAuth() as any);
          navigate("/");
        } else {
          console.error("AccessToken or RefreshToken is missing");
          dispatch({
            type: LOGIN_ATTEMPT_FAIL,
          });
        }
      } else {
        dispatch({
          type: LOGIN_ATTEMPT_FAIL,
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: LOGIN_ATTEMPT_FAIL,
      });
    }
  };
