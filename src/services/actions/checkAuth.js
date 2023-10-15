export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const  REMOVE_USER_DATA = 'REMOVE_USER_DATA'
export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const removeUserData = () => {
    return {
        type: REMOVE_USER_DATA
    }
}