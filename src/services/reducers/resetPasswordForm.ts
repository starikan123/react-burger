import {
  TResetPasswordActions,
  PASSWORD_RESET,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
} from "../actions/resetPasswordForm";

interface IResetPasswordState {
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
}

const initialState: IResetPasswordState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export const resetPasswordFormReducer = (
  state = initialState,
  action: TResetPasswordActions
): IResetPasswordState => {
  switch (action.type) {
    case PASSWORD_RESET:
      return {
        ...state,
        resetPasswordRequest: true,
      };

    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
      };

    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };

    default:
      return state;
  }
};
