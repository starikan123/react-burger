import {
    GET_ORDER_DESCRIPTION,
    GET_ORDER_DESCRIPTION_FAIL,
    GET_ORDER_DESCRIPTION_SUCCESS
} from "../actions/orderDescription";

const initialState = {
    order: {},
    getOrderDescription: false,
    getOrderDescriptionFail: false
}

export const orderDescriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_DESCRIPTION:
            return {
                ...state,
                getOrderDescription: true,
                getOrderDescriptionFail: false
            }
        case GET_ORDER_DESCRIPTION_SUCCESS:
            return {
                getOrderDescription: false,
                getOrderDescriptionFail: false,
                order: action.payload
            }
        case GET_ORDER_DESCRIPTION_FAIL:
            return {
                ...state,
                getOrderDescription: false,
                getOrderDescriptionTrue: false
            }
        default:
            return state
    }
}