import {api, checkResponse, checkUserAuth, refreshToken} from "../api";
import {getCookie, deleteCookie} from "../utils";
import {removeUserData} from "./checkAuth";

export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAIL = 'FETCH_USER_PROFILE_FAIL';
export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAIL = 'UPDATE_USER_PROFILE_FAIL';
export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_REQUEST_SUCCESS = 'LOGOUT_USER_REQUEST_SUCCESS'
export const LOGOUT_USER_REQUEST_FAIL = 'LOGOUT_USER_REQUEST_FAIL'


export const fetchUserProfile = () => {
    return async function (dispatch) {
        const token = getCookie('accessToken')
        dispatch({type: FETCH_USER_PROFILE_REQUEST});
        const getUserData = async () => {
            try {
                const response = await fetch(`${api}/auth/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await checkResponse(response);
                if (data && data.success) {
                    dispatch({
                        type: FETCH_USER_PROFILE_SUCCESS,
                        payload: data
                    });
                    return data;
                } else {
                    throw new Error(data.message || 'Profile fetch failed');
                }
            } catch (error) {
                if (error.message === 'jwt expired') {
                    const refreshedToken = await refreshToken();
                    if (refreshedToken) {
                        return getUserData()
                    } else {
                        dispatch({type: FETCH_USER_PROFILE_FAIL, payload: error});
                    }
                } else {
                    dispatch({type: FETCH_USER_PROFILE_FAIL, payload: error});
                }
            }
        }
        return getUserData()
    }
}

export const updateUserProfile = (name, email) => {
    return async function (dispatch) {
        const token = getCookie('accessToken')
        dispatch({type: UPDATE_USER_PROFILE_REQUEST});
        const updateUserData = async (name, email) => {
            try {
                const response = await fetch(`${api}/auth/user`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify({
                        "name": name,
                        "email": email
                    })
                });
                const data = await checkResponse(response);
                if (data && data.success) {
                    dispatch({
                        type: UPDATE_USER_PROFILE_SUCCESS,
                        payload: data
                    });
                } else {
                    throw new Error(data.message || 'Profile fetch failed');
                }
            } catch (error) {
                if (error.message === 'jwt expired') {
                    const refreshedToken = await refreshToken();
                    if (refreshedToken) {
                        updateUserData(name, email)
                    } else {
                        dispatch({type: UPDATE_USER_PROFILE_FAIL, payload: error});
                    }
                } else {
                    dispatch({type: UPDATE_USER_PROFILE_FAIL, payload: error});
                }
            }
        }
        updateUserData(name, email)
    }
}

export const logout = () => {
    return async function (dispatch) {
        const token = getCookie('refreshToken')
        dispatch({type: LOGOUT_USER_REQUEST});
        const logUserOut = async () => {
            try {
                const response = await fetch(`${api}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify({
                        "token": token
                    })
                });
                const data = await checkResponse(response);
                if (data && data.success) {
                    dispatch({
                        type: LOGOUT_USER_REQUEST_SUCCESS,
                        payload: data
                    })
                    deleteCookie('refreshToken')
                    deleteCookie('accessToken')
                    dispatch(removeUserData())
                    dispatch(checkUserAuth())
                } else {
                    throw new Error(data.message || 'Profile fetch failed');
                }
            } catch (error) {
                if (error.message === 'jwt expired') {
                    const refreshedToken = await refreshToken();
                    if (refreshedToken) {
                        logUserOut()
                    } else {
                        dispatch({type: LOGOUT_USER_REQUEST_FAIL, payload: error});
                    }
                } else {
                    dispatch({type: LOGOUT_USER_REQUEST_FAIL, payload: error});
                }
            }
        }
        logUserOut()
    }
}