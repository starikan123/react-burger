import {
  WS_ORDERS_HISTORY_CONNECTION_START,
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  connectionOpen: false,
};

export const ordersHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDERS_HISTORY_CONNECTION_START:
      return {
        ...state,
        connectionOpen: true,
      };
    case WS_ORDERS_HISTORY_CONNECTION_CLOSED:
      return {
        ...state,
        connectionOpen: false,
      };
    default:
      return state;
  }
};
