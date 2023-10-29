import { IUser } from "../actions/checkAuth";
import * as actionTypes from "../actions/checkAuth";
import { TCheckAuthActions } from "../actions/checkAuth";

interface AuthState {
  user: IUser | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
};

export const AuthReducer = (
  state = initialState,
  action: TCheckAuthActions
): AuthState => {
  switch (action.type) {
    case actionTypes.SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.REMOVE_USER_DATA:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
