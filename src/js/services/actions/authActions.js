import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "./actionTypes";

export function loginRequest(user) {
  return { type: LOGIN_REQUEST, payload: user };
}

export function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, payload: user };
}

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, payload: error };
}

export function registerRequest(user) {
  return { type: REGISTER_REQUEST, payload: user };
}

export function registerSuccess(user) {
  return { type: REGISTER_SUCCESS, payload: user };
}

export function registerFailure(error) {
  return { type: REGISTER_FAILURE, payload: error };
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
