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
  LOGOUT_SUCCESS,
  RESET_FORGOT_PASSWORD_INITIATED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../actions/actionTypes";

import { getCookie } from "../../utils/cookieHelpers";

const initialState = {
  loading: false,
  user: null,
  error: null,
  accessToken: getCookie("accessToken") || null,
  refreshToken: getCookie("refreshToken") || null,
  isAuthenticated: !!getCookie("refreshToken"),
  forgotPasswordStatus: null,
  resetPasswordStatus: null,
  forgotPasswordInitiated: false,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case GET_USER_REQUEST:
      return { ...state, loading: true };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotPasswordStatus: action.payload.status,
        forgotPasswordInitiated: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordSuccess: true,
        forgotPasswordInitiated: false,
        error: null,
      };
    case RESET_FORGOT_PASSWORD_INITIATED:
      return {
        ...state,
        forgotPasswordInitiated: false,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        forgotPasswordStatus: action.payload.status,
        error: action.payload.error,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        currentIngredient: null,
      };
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}

export default authReducer;
