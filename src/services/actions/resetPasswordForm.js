import {api, checkResponse} from "../api";
import {getCookie} from "../utils";

export const PASSWORD_RESET = 'REQUEST_PASSWORD_RESET'
export const PASSWORD_RESET_SUCCESS = 'REQUEST_PASSWORD_RESET_SUCCESS'
export const PASSWORD_RESET_FAIL = 'REQUEST_PASSWORD_RESET_FAIL'

export const resetPassword = (password, token) => {
    return function (dispatch) {
        dispatch({
            type: PASSWORD_RESET
        })
        fetch(`${api}/password-reset/reset`, {
            method: 'POST', body: JSON.stringify({
                "password": password,
                "token": token
            }), headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
        }).then(checkResponse).then(res => {
            if (res && res.success) {
                dispatch({
                    type: PASSWORD_RESET_SUCCESS,
                })
            } else {
                dispatch({
                    type: PASSWORD_RESET_FAIL
                })
            }
        }).catch(err => {
            console.error(err)
            dispatch({
                type: PASSWORD_RESET_FAIL,
            })
        })
    }
}