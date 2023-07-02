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
} from "./actionTypes";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookieHelpers";

export function loginRequest(user) {
  return { type: LOGIN_REQUEST, payload: user };
}

export function loginSuccess(user, accessToken, refreshToken) {
  setCookie("refreshToken", refreshToken, 7);
  return { type: LOGIN_SUCCESS, payload: { user, accessToken, refreshToken } };
}

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, payload: error };
}

export function registerRequest(user) {
  return { type: REGISTER_REQUEST, payload: user };
}

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
      const response = await fetch(
        "https://norma.nomoreparties.space/api/password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (data.success) {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
      } else {
        dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: data.message });
      }
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
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
  dispatch({ type: RESET_PASSWORD_REQUEST });

  try {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/password-reset/reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } else {
      throw new Error("Failed to reset password");
    }
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (data.success) {
      dispatch(loginSuccess(data.user, data.accessToken, data.refreshToken));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const register = (email, password, name) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    const data = await response.json();

    if (data.success) {
      dispatch(registerSuccess(data.user, data.accessToken, data.refreshToken));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  const refreshToken = getCookie("refreshToken");

  try {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/auth/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      }
    );

    const data = await response.json();

    if (data.success) {
      deleteCookie("refreshToken");
      dispatch(logout());
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
    const response = await fetch(
      "https://norma.nomoreparties.space/api/auth/user",
      {
        headers: {
          authorization: getState().auth.accessToken,
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data.user,
      });
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
    const response = await fetch(
      "https://norma.nomoreparties.space/api/auth/user",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: getState().auth.accessToken,
        },
        body: JSON.stringify(userInfo),
      }
    );
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data.user,
      });
    } else {
      dispatch({ type: UPDATE_USER_FAILURE, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.toString() });
  }
};
