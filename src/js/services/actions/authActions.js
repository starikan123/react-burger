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
import { baseUrl } from "../../utils/constants";

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

export function forgotPasswordSuccess(user) {
  return { type: FORGOT_PASSWORD_SUCCESS, payload: user };
}

export function forgotPasswordFailure(error) {
  return { type: FORGOT_PASSWORD_FAILURE, payload: error };
}

export function forgotPasswordRequest(email) {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    try {
      const response = await fetch(`${baseUrl}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(forgotPasswordSuccess(data));
      } else {
        dispatch(forgotPasswordFailure(data.message));
      }
    } catch (error) {
      dispatch(forgotPasswordFailure(error.message));
    }
  };
}

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
    const response = await fetch(`${baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(resetPasswordSuccess(data));
    } else {
      dispatch(resetPasswordFailure("Failed to reset password"));
    }
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Server error occurred. Please try again.");
      }

      const data = await response.json();

      if (data.success) {
        setCookie("accessToken", data.accessToken.split(" ")[1], 1);
        setCookie("refreshToken", data.refreshToken, 7);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const logoutUser = () => async (dispatch) => {
  const refreshToken = getCookie("refreshToken");

  try {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });

    const data = await response.json();

    if (data.success) {
      deleteCookie("refreshToken");
      dispatch(logout());
      dispatch(logoutSuccess());
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Failed to logout", error);
  }
};

export const getUser = () => async (dispatch, getState) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const response = await fetch(`${baseUrl}/auth/user`, {
      headers: { authorization: getState().auth.accessToken },
    });

    const data = await response.json();

    if (data.success) {
      dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    } else {
      dispatch({ type: GET_USER_FAILURE, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.toString() });
  }
};

export const updateUser = (userInfo) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const response = await fetch(`${baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: getState().auth.accessToken,
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (data.success) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    } else {
      dispatch({ type: UPDATE_USER_FAILURE, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.toString() });
  }
};

export function register(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => {
          throw new Error(json.message);
        });
      })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res,
        });
        setCookie("accessToken", res.accessToken.split(" ")[1], 1);
        setCookie("refreshToken", res.refreshToken, 7);
      })
      .catch((error) => {
        console.error("Server Error:", error.message);
        dispatch({
          type: REGISTER_FAILURE,
          payload: error.message,
        });
      });
  };
}
