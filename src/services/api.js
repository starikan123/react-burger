import {getCookie, setCookie} from "./utils";
import {fetchUserProfile} from "./actions/profileForm";
import {setAuthChecked, setUser} from "./actions/checkAuth";

export const api = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function refreshToken() {
    const token = getCookie('refreshToken');
    try {
        const response = await fetch(`${api}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": token
            })
        });

        const data = await response.json();

        if (data && data.success) {
            setCookie('accessToken', data.accessToken, {expires: 1800})
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export const checkUserAuth = () => {
    return (dispatch) => {
        if (getCookie('accessToken')) {
            dispatch(fetchUserProfile())
                .then(data => {
                    dispatch(setUser(data.user));
                })
                .finally(() => {
                    dispatch(setAuthChecked(true));
                });
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};