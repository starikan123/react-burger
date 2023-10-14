import {LOGIN_ATTEMPT, LOGIN_ATTEMPT_SUCCESS, LOGIN_ATTEMPT_FAIL} from "../actions/loginForm";

const initialState = {
    authInfo: {},
    loginAttempt: false,
    loginAttemptFail: false
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ATTEMPT:
            return {
                ...state,
                loginAttempt: true
            }
        case LOGIN_ATTEMPT_SUCCESS:
            return {
                ...state,
                loginAttempt: false,
                authInfo: action.payload
            }
        case LOGIN_ATTEMPT_FAIL:
            return {
                ...state,
                loginAttempt: false,
                loginAttemptFail: true
            }
        default:
            return state
    }
}