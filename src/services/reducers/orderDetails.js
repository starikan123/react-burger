import {SEND_ORDER_DETAILS, SEND_ORDER_DETAILS_FAIL, SEND_ORDER_DETAILS_SUCCESS} from "../actions/orderDetails";

const initialState = {
    ingredients: [],
    orderId: null,
    sendOrderDetailsRequest: false,
    sendOrderDetailsFailed: false,
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_ORDER_DETAILS:
            return {
                ...state,
                sendOrderDetailsRequest: true
            }
        case SEND_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderId: action.orderId,
                sendOrderDetailsRequest: false,
                sendOrderDetailsFailed: false

            }
        case SEND_ORDER_DETAILS_FAIL:
            return {
                ...state,
                sendOrderDetailsRequest: false,
                sendOrderDetailsFailed: true,
            }
        default:
            return state
    }
}