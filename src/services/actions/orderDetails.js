import {api, checkResponse} from "../api";
import {getCookie} from "../utils";

export const SEND_ORDER_DETAILS = 'SEND_ORDER_DETAILS'
export const SEND_ORDER_DETAILS_SUCCESS = 'SEND_ORDER_DETAILS_SUCCESS'
export const SEND_ORDER_DETAILS_FAIL = 'GET_ORDER_DETAILS_FAIL'

export const getOrderDetails = (ingredientIds, user, navigate) => {
    const token = getCookie('accessToken')
    return function (dispatch) {
        if (!user) {
            navigate('/login');
            return;
        }
        dispatch({
            type: SEND_ORDER_DETAILS
        })
        fetch(`${api}/orders`, {
                method: 'POST',
                body: JSON.stringify({ingredients: ingredientIds}),
                headers: {
                    'Authorization': token,
                    "content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(checkResponse).then(res => {
            if (res && res.success) {
                dispatch({
                    type: SEND_ORDER_DETAILS_SUCCESS,
                    orderId: res.order.number
                })
            } else {
                dispatch({
                    type: SEND_ORDER_DETAILS_FAIL
                })
            }
        })
    }
}