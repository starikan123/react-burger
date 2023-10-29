import {
  LOGIN_ATTEMPT,
  LOGIN_ATTEMPT_SUCCESS,
  LOGIN_ATTEMPT_FAIL,
  TLoginFormActions,
} from "../actions/loginForm";

interface IAuthInfo {
  accessToken: string;
  refreshToken: string;
}

interface ILoginState {
  authInfo: IAuthInfo | null;
  loginAttempt: boolean;
  loginAttemptFail: boolean;
}

const initialState: ILoginState = {
  authInfo: null,
  loginAttempt: false,
  loginAttemptFail: false,
};

export const loginReducer = (
  state = initialState,
  action: TLoginFormActions
): ILoginState => {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return {
        ...state,
        loginAttempt: true,
        loginAttemptFail: false,
      };
    case LOGIN_ATTEMPT_SUCCESS:
      return {
        ...state,
        loginAttempt: false,
        authInfo: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };
    case LOGIN_ATTEMPT_FAIL:
      return {
        ...state,
        loginAttempt: false,
        loginAttemptFail: true,
      };
    default:
      return state;
  }
};
