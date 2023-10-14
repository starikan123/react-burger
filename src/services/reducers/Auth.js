import {
  SET_AUTH_CHECKED,
  SET_USER,
  REMOVE_USER_DATA,
} from "../actions/checkAuth";

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER_DATA:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
