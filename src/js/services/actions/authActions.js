import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CLEAR_ERROR,
  LOGOUT_SUCCESS,
} from "./actionTypes";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookieHelpers";
import { request } from "../../utils/apiUtils";

export function loginRequest(user) {
  return { type: LOGIN_REQUEST, payload: user };
}

export function loginSuccess(user, accessToken, refreshToken) {
  setCookie("accessToken", accessToken, 1);
  setCookie("refreshToken", refreshToken, 7);
  return { type: LOGIN_SUCCESS, payload: { user, accessToken, refreshToken } };
}

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, payload: error };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}

export function registerRequest(user) {
  return { type: REGISTER_REQUEST, payload: user };
}
export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export function registerSuccess(user, accessToken, refreshToken) {
  setCookie("refreshToken", refreshToken, 7);
  return {
    type: REGISTER_SUCCESS,
    payload: { user, accessToken, refreshToken },
  };
}

export function registerFailure(error) {
  return { type: REGISTER_FAILURE, payload: error };
}

export function logout() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  return { type: LOGOUT };
}

export function forgotPasswordSuccess() {
  return { type: FORGOT_PASSWORD_SUCCESS, payload: { status: "success" } };
}

export function forgotPasswordFailure(error) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: { status: "failure", error },
  };
}

export const forgotPasswordRequest = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const data = await request("/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFailure(error));
  }
};

export function resetPasswordRequest() {
  return { type: RESET_PASSWORD_REQUEST };
}

export function resetPasswordSuccess(message) {
  return { type: RESET_PASSWORD_SUCCESS, payload: message };
}

export function resetPasswordFailure(error) {
  return { type: RESET_PASSWORD_FAILURE, payload: error };
}

export const resetPassword = (password, token) => async (dispatch) => {
  dispatch(resetPasswordRequest());

  try {
    const data = await request("/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    });
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFailure(error));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest({ email, password }));

  try {
    const data = await request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    });

    if (data && data.success) {
      setCookie("accessToken", data.accessToken.split(" ")[1], 1);
      setCookie("refreshToken", data.refreshToken, 7);
      dispatch(loginSuccess(data.user, data.accessToken, data.refreshToken));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(
      loginFailure(error.message || "Server error occurred. Please try again.")
    );
  }
};

export const logoutUser = () => async (dispatch) => {
  const refreshToken = getCookie("refreshToken");

  try {
    const data = await request("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (data && data.success) {
      deleteCookie("refreshToken");
      dispatch(logout());
      dispatch(logoutSuccess());
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(
      "Failed to logout",
      error.message || "Server error occurred. Please try again."
    );
  }
};

export const getUser = () => async (dispatch, getState) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const data = await request("/auth/user", {
      headers: { authorization: getState().auth.accessToken },
    });

    if (data && data.success) {
      dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.toString() });
  }
};

export const updateUser = (userInfo) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const data = await request("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: getState().auth.accessToken,
      },
      body: JSON.stringify(userInfo),
    });

    if (data && data.success) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.toString() });
  }
};

export function register(email, password, name) {
  return async function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    try {
      const data = await request("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      if (data && data.success) {
        setCookie("accessToken", data.accessToken.split(" ")[1], 1);
        setCookie("refreshToken", data.refreshToken, 7);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Server Error:", error.message);
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };
}
