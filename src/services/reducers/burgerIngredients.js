import {GET_INGREDIENTS_FAIL, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS,} from "../actions/burgerIngredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true,
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false
            }
        case GET_INGREDIENTS_FAIL:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        default:
            return state;
    }
}