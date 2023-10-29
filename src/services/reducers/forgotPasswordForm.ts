import {
  TForgotPasswordFormActions,
  EMAIL_PASSWORD_RESET_LINK,
  EMAIL_PASSWORD_RESET_LINK_SUCCESS,
  EMAIL_PASSWORD_RESET_LINK_FAIL,
} from "../actions/forgotPasswordForm";

interface IForgotPasswordFormState {
  emailPasswordResetLinkRequest: boolean;
  emailPasswordResetLinkFailed: boolean;
}

const initialState: IForgotPasswordFormState = {
  emailPasswordResetLinkRequest: false,
  emailPasswordResetLinkFailed: false,
};

export const forgotPasswordFormReducer = (
  state = initialState,
  action: TForgotPasswordFormActions
): IForgotPasswordFormState => {
  switch (action.type) {
    case EMAIL_PASSWORD_RESET_LINK:
      return {
        ...state,
        emailPasswordResetLinkRequest: true,
      };

    case EMAIL_PASSWORD_RESET_LINK_SUCCESS:
      return {
        ...state,
        emailPasswordResetLinkRequest: false,
      };
    case EMAIL_PASSWORD_RESET_LINK_FAIL:
      return {
        ...state,
        emailPasswordResetLinkRequest: false,
        emailPasswordResetLinkFailed: true,
      };
    default:
      return state;
  }
};
