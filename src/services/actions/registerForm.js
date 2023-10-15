import {api, checkResponse} from "../api";

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL'

export const registerUser = (email, password, name) => {
    return function (dispatch) {
        dispatch({
            type: REGISTER_USER
        })
        fetch(`${api}/auth/register`, {
            method: 'POST', body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            }), headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        }).then(checkResponse).then(res => {
            if (res && res.success) {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: res
                })
            } else {
                dispatch({
                    type: REGISTER_USER_FAIL
                })
            }
        }).catch(err => {
            console.error(err)
            dispatch({
                type: REGISTER_USER_FAIL,
            })
        })
    }
}