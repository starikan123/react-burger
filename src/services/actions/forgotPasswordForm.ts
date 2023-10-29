import { Dispatch } from "redux";
import { api, checkResponse } from "../api";

export const EMAIL_PASSWORD_RESET_LINK = "EMAIL_PASSWORD_RESET_LINK" as const;
export const EMAIL_PASSWORD_RESET_LINK_SUCCESS =
  "EMAIL_PASSWORD_RESET_LINK_SUCCESS" as const;
export const EMAIL_PASSWORD_RESET_LINK_FAIL =
  "EMAIL_PASSWORD_RESET_LINK_FAIL" as const;

interface IEmailPasswordResetLinkAction {
  type: typeof EMAIL_PASSWORD_RESET_LINK;
}

interface IEmailPasswordResetLinkSuccessAction {
  type: typeof EMAIL_PASSWORD_RESET_LINK_SUCCESS;
}

interface IEmailPasswordResetLinkFailAction {
  type: typeof EMAIL_PASSWORD_RESET_LINK_FAIL;
}

export type TForgotPasswordFormActions =
  | IEmailPasswordResetLinkAction
  | IEmailPasswordResetLinkSuccessAction
  | IEmailPasswordResetLinkFailAction;

interface IRequestPasswordChangeEmailOptions {
  onSuccess?: () => void;
}

export const requestPasswordChangeEmail = (
  email: string,
  options?: IRequestPasswordChangeEmailOptions
) => {
  return function (dispatch: Dispatch<TForgotPasswordFormActions>) {
    dispatch({
      type: EMAIL_PASSWORD_RESET_LINK,
    });
    fetch(`${api}/password-reset`, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: { "content-type": "application/json; charset=UTF-8" },
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: EMAIL_PASSWORD_RESET_LINK_SUCCESS,
          });
          if (options?.onSuccess) {
            options.onSuccess();
          }
        } else {
          dispatch({
            type: EMAIL_PASSWORD_RESET_LINK_FAIL,
          });
        }
      });
  };
};
