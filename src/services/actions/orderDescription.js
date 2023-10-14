import {api, checkResponse} from "../api";

export const GET_ORDER_DESCRIPTION = 'GET_ORDER_DESCRIPTION'
export const GET_ORDER_DESCRIPTION_SUCCESS = 'GET_ORDER_DESCRIPTION_SUCCESS'
export const GET_ORDER_DESCRIPTION_FAIL = 'GET_ORDER_DESCRIPTION_FAIL'

export const fetchOrderDetails = (orderNumber) => {
    return async function (dispatch) {
        dispatch({type: GET_ORDER_DESCRIPTION});
        try {
            const response = await fetch(`${api}/orders/${orderNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await checkResponse(response);
            if (data && data.success) {
                dispatch({
                    type: GET_ORDER_DESCRIPTION_SUCCESS,
                    payload: data.orders[0]
                });
                return data.orders[0];
            } else {
                throw new Error(data.message || 'fetching order details failed');
            }
        } catch (error) {
            dispatch({type: GET_ORDER_DESCRIPTION_FAIL, payload: error});
        }
    }
}
