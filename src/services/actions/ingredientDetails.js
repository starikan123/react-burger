import {api, checkResponse} from "../api";

export const SAVE_CURRENT_INGREDIENT_DETAILS = 'SAVE_CURRENT_INGREDIENT_DETAILS'

export const REMOVE_CURRENT_INGREDIENT_DETAILS = 'REMOVE_CURRENT_INGREDIENT_DETAILS'
export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS'
export const GET_INGREDIENT_DETAILS_SUCCESS = 'GET_INGREDIENT_DETAILS_SUCCESS'
export const GET_INGREDIENT_DETAILS_FAIL = 'GET_INGREDIENT_DETAILS_FAIL'

export const saveCurrentIngredientDetails = (ingredient) => ({
    type: SAVE_CURRENT_INGREDIENT_DETAILS,
    payload: ingredient
})

export const fetchIngredientDetails = (id) => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENT_DETAILS
        })
        fetch(`${api}/ingredients`).then(checkResponse).then(res => {
            if (res && res.success) {
                const ingredientDetails = res.data.find(item => item._id === id);
                dispatch({
                    type: GET_INGREDIENT_DETAILS_SUCCESS,
                    payload: ingredientDetails
                })
            } else {
                dispatch({
                    type: GET_INGREDIENT_DETAILS_FAIL
                })
            }
        });
    }

}