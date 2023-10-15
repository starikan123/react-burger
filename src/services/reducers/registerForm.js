import {REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL} from "../actions/registerForm";

const initialState = {
    authInfo: {},
    registerUserRequest: false,
    registerUserFail: false
}

export const registerUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                registerUserRequest: true
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                registerUserRequest: false,
                authInfo: action.payload
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                registerUserRequest: false,
                registerUserFail: true
            }
        default:
            return state
    }
}