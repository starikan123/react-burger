import {GET_INGREDIENT_DETAILS, GET_INGREDIENT_DETAILS_SUCCESS, GET_INGREDIENT_DETAILS_FAIL} from "../actions/ingredientDetails";

const initialState = {
    ingredient: null,
    ingredientDetailsRequest: false,
    ingredientDetailsRequestFail: false
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENT_DETAILS:
            return {
                ...state,
                ingredientDetailsRequest: true,
            }
        case GET_INGREDIENT_DETAILS_SUCCESS:
            return {
                ...state,
                ingredient: action.payload,
                ingredientDetailsRequest: false,
                ingredientDetailsRequestFail: false
            }
        case GET_INGREDIENT_DETAILS_FAIL:
            return {
                ...state,
                ingredientDetailsRequestFail: true
            }
        default: {
            return state
        }
    }
}