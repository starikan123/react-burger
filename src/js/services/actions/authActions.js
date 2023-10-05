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
  FORGOT_PASSWORD_INITIATED,
  RESET_FORGOT_PASSWORD_INITIATED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILURE,
} from "./actionTypes";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookieHelpers";
import { request } from "../../utils/apiUtils";
import jwtDecode from "jwt-decode";

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

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

export const resetPasswordSuccess = (data) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});

export const resetPasswordFailure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});

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

  if (!refreshToken) {
    console.warn("No refresh token found. Logging out locally.");
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
    dispatch(logout());
    return;
  }

  try {
    const data = await request("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (data && data.success) {
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
      dispatch(logout());
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(
      "Failed to logout",
      error.message || "Server error occurred. Please try again."
    );
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
    dispatch(logout());
  }
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return true;
  }
};
export const updateToken = () => async (dispatch) => {
  dispatch({ type: UPDATE_TOKEN_REQUEST });

  try {
    const response = await request("/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });

    if (response && response.success) {
      const { accessToken, refreshToken } = response;
      setCookie("accessToken", accessToken, { expires: 1 });
      setCookie("refreshToken", refreshToken, { expires: 7 });
      dispatch({ type: UPDATE_TOKEN_SUCCESS, payload: { accessToken } });
    } else {
      dispatch(logout());
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: UPDATE_TOKEN_FAILURE, payload: error.toString() });
    dispatch(logout());
  }
};

export const getUser = () => async (dispatch, getState) => {
  dispatch(getUserRequest());

  try {
    let token = getState().auth.accessToken;
    if (isTokenExpired(token)) {
      await dispatch(updateToken());
      token = getState().auth.accessToken;
    }

    const response = await request("/auth/user", {
      headers: { authorization: token },
    });

    if (response && response.success) {
      dispatch(getUserSuccess(response.user));
    } else {
      throw new Error(response.message || "Unauthorized");
    }
  } catch (error) {
    console.error(error);
    dispatch(getUserFailure(error.toString()));
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

export const forgotPasswordInitiated = () => {
  return {
    type: FORGOT_PASSWORD_INITIATED,
  };
};

export const resetForgotPasswordInitiated = () => {
  return {
    type: RESET_FORGOT_PASSWORD_INITIATED,
  };
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
