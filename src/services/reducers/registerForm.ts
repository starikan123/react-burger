import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  TRegisterActions,
} from "../actions/registerForm";

import { IApiResponse } from "../api";

interface IRegisterUserState {
  authInfo: IApiResponse | {};
  registerUserRequest: boolean;
  registerUserFail: boolean;
}

const initialState: IRegisterUserState = {
  authInfo: {},
  registerUserRequest: false,
  registerUserFail: false,
};

export const registerUserReducer = (
  state = initialState,
  action: TRegisterActions
): IRegisterUserState => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registerUserRequest: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUserRequest: false,
        authInfo: action.payload,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        registerUserRequest: false,
        registerUserFail: true,
      };
    default:
      return state;
  }
};
