import {
  GET_ORDER_DESCRIPTION,
  GET_ORDER_DESCRIPTION_FAIL,
  GET_ORDER_DESCRIPTION_SUCCESS,
  TOrderDescriptionActions,
  IOrder,
} from "../actions/orderDescription";

interface IOrderDescriptionState {
  order: IOrder | null;
  getOrderDescription: boolean;
  getOrderDescriptionFail: boolean;
}

const initialState: IOrderDescriptionState = {
  order: null,
  getOrderDescription: false,
  getOrderDescriptionFail: false,
};

export const orderDescriptionReducer = (
  state = initialState,
  action: TOrderDescriptionActions
): IOrderDescriptionState => {
  switch (action.type) {
    case GET_ORDER_DESCRIPTION:
      return {
        ...state,
        getOrderDescription: true,
        getOrderDescriptionFail: false,
      };
    case GET_ORDER_DESCRIPTION_SUCCESS:
      return {
        ...state,
        getOrderDescription: false,
        order: action.payload,
      };
    case GET_ORDER_DESCRIPTION_FAIL:
      return {
        ...state,
        getOrderDescription: false,
        getOrderDescriptionFail: true,
      };
    default:
      return state;
  }
};
