import {api, checkResponse, checkUserAuth} from "../api";
import {setCookie} from "../utils";
import {useNavigate} from "react-router-dom";

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_ATTEMPT_SUCCESS = 'LOGIN_ATTEMPT_SUCCESS'
export const LOGIN_ATTEMPT_FAIL = 'LOGIN_ATTEMPT_FAIL'

export const loginRequest = (email, password, navigate) => {
    return async function (dispatch) {
        dispatch({
            type: LOGIN_ATTEMPT
        })
        await fetch(`${api}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(checkResponse).then(res => {
            if (res && res.success) {
                setCookie('accessToken', res.accessToken, {expires: 12000})
                setCookie('refreshToken', res.refreshToken, {expires: 86400})
                dispatch({
                    type: LOGIN_ATTEMPT_SUCCESS,
                    payload: res
                })
                dispatch(checkUserAuth())
                navigate('/');
            } else {
                dispatch({
                    type: LOGIN_ATTEMPT_FAIL
                })
            }
        }).catch(err => {
            console.error(err)
            dispatch({
                type: LOGIN_ATTEMPT_FAIL,
            })
        })
    }
}