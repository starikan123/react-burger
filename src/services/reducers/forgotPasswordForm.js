import {
    EMAIL_PASSWORD_RESET_LINK,
    EMAIL_PASSWORD_RESET_LINK_FAIL,
    EMAIL_PASSWORD_RESET_LINK_SUCCESS
} from "../actions/forgotPasswordForm";

const initialState = {
    emailPasswordResetLinkRequest: false,
    emailPasswordResetLinkFailed: false
}

export const forgotPasswordFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMAIL_PASSWORD_RESET_LINK:
            return {
                ...state,
                emailPasswordResetLinkRequest: true,
            }

        case EMAIL_PASSWORD_RESET_LINK_SUCCESS:
            return {
                ...state,
                emailPasswordResetLinkRequest: false,
            }
        case EMAIL_PASSWORD_RESET_LINK_FAIL:
            return {
                ...state,
                emailPasswordResetLinkRequest: false,
                emailPasswordResetLinkFailed: true
            }
        default:
            return state;
    }
}