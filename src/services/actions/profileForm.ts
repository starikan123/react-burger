import { AppThunk } from "../../index";
import { api, checkResponse, refreshToken } from "../api";
import { getCookie, deleteCookie } from "../utils";
import { removeUserData } from "./checkAuth";

export const FETCH_USER_PROFILE_REQUEST = "FETCH_USER_PROFILE_REQUEST" as const;
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS" as const;
export const FETCH_USER_PROFILE_FAIL = "FETCH_USER_PROFILE_FAIL" as const;
export const UPDATE_USER_PROFILE_REQUEST =
  "UPDATE_USER_PROFILE_REQUEST" as const;
export const UPDATE_USER_PROFILE_SUCCESS =
  "UPDATE_USER_PROFILE_SUCCESS" as const;
export const UPDATE_USER_PROFILE_FAIL = "UPDATE_USER_PROFILE_FAIL" as const;
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST" as const;
export const LOGOUT_USER_REQUEST_SUCCESS =
  "LOGOUT_USER_REQUEST_SUCCESS" as const;
export const LOGOUT_USER_REQUEST_FAIL = "LOGOUT_USER_REQUEST_FAIL" as const;

export interface IUserProfile {
  username?: string;
  email: string;
  name: string;
  password?: string;
}

interface IError {
  message: string;
}
export interface IFetchUserProfileRequestAction {
  type: typeof FETCH_USER_PROFILE_REQUEST;
}

export interface IFetchUserProfileSuccessAction {
  type: typeof FETCH_USER_PROFILE_SUCCESS;
  payload: IUserProfile;
}

export interface IFetchUserProfileFailAction {
  type: typeof FETCH_USER_PROFILE_FAIL;
  payload: IError;
}

interface IUpdateUserProfileRequestAction {
  type: typeof UPDATE_USER_PROFILE_REQUEST;
}

interface IUpdateUserProfileSuccessAction {
  type: typeof UPDATE_USER_PROFILE_SUCCESS;
  payload: { user: IUserProfile };
}

interface IUpdateUserProfileFailAction {
  type: typeof UPDATE_USER_PROFILE_FAIL;
  payload: IError;
}

interface ILogoutUserRequestAction {
  type: typeof LOGOUT_USER_REQUEST;
}

interface ILogoutUserRequestSuccessAction {
  type: typeof LOGOUT_USER_REQUEST_SUCCESS;
}

interface ILogoutUserRequestFailAction {
  type: typeof LOGOUT_USER_REQUEST_FAIL;
  payload: IError;
}

export type TProfileFormActions =
  | IFetchUserProfileRequestAction
  | IFetchUserProfileSuccessAction
  | IFetchUserProfileFailAction
  | IUpdateUserProfileRequestAction
  | IUpdateUserProfileSuccessAction
  | IUpdateUserProfileFailAction
  | ILogoutUserRequestAction
  | ILogoutUserRequestSuccessAction
  | ILogoutUserRequestFailAction;

export const fetchUserProfile =
  (): AppThunk<Promise<IUserProfile>> => async (dispatch) => {
    dispatch({ type: FETCH_USER_PROFILE_REQUEST });

    const token = getCookie("accessToken");
    if (!token) {
      const errorMessage = { message: "No access token found" };
      dispatch({ type: FETCH_USER_PROFILE_FAIL, payload: errorMessage });
      return Promise.reject(errorMessage);
    }

    try {
      const response = await fetch(`${api}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await checkResponse(response);
      if (data && data.success && data.user) {
        const userProfile: IUserProfile = {
          email: data.user.email,
          name: data.user.name,
        };
        dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: userProfile });
        return userProfile;
      } else {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      const err = error as IError;
      if (err.message === "jwt expired") {
        const refreshed = await dispatch(refreshToken());
        if (refreshed) {
          return dispatch(fetchUserProfile());
        }
      }
      dispatch({ type: FETCH_USER_PROFILE_FAIL, payload: err });
      return Promise.reject(err);
    }
  };

export const updateUserProfile =
  (name: string, email: string, password?: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

    const token = getCookie("accessToken");
    if (!token) {
      const errorMessage: IError = { message: "No access token found" };
      dispatch({ type: UPDATE_USER_PROFILE_FAIL, payload: errorMessage });
      return;
    }

    try {
      const requestBody: Partial<IUserProfile> = { name, email };
      if (password) requestBody.password = password;

      const response = await fetch(`${api}/auth/user`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await checkResponse(response);
      if (data && data.success && data.user) {
        const userProfile: IUserProfile = {
          email: data.user.email,
          name: data.user.name,
        };
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: userProfile });
      } else {
        throw new Error("Invalid user data");
      }
      return;
    } catch (error) {
      const err = error as IError;
      if (err.message === "jwt expired") {
        const refreshed = await dispatch(refreshToken());
        if (refreshed) {
          return dispatch(updateUserProfile(name, email, password));
        }
      }
      dispatch({ type: UPDATE_USER_PROFILE_FAIL, payload: err });
    }
  };

export const logout = (): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUEST });

  const token = getCookie("refreshToken");
  if (!token) {
    const errorMessage: IError = { message: "No refresh token found" };
    dispatch({ type: LOGOUT_USER_REQUEST_FAIL, payload: errorMessage });
    return;
  }

  try {
    const response = await fetch(`${api}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    await checkResponse(response);
    dispatch({ type: LOGOUT_USER_REQUEST_SUCCESS });
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
    dispatch(removeUserData());
    return;
  } catch (error) {
    const err = error as IError;
    if (err.message === "jwt expired") {
      const refreshed = await dispatch(refreshToken());
      if (refreshed) {
        return dispatch(logout());
      }
    }
    dispatch({ type: LOGOUT_USER_REQUEST_FAIL, payload: err });
  }
};
