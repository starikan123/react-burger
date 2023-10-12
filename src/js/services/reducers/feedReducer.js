import {
  START_FEED_CONNECTION,
  CLOSE_FEED_CONNECTION,
  FEED_CONNECTION_MESSAGE,
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  connectionOpen: false,
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FEED_CONNECTION:
      return {
        ...state,
        connectionOpen: true,
      };
    case CLOSE_FEED_CONNECTION:
      return {
        ...state,
        connectionOpen: false,
        messages: [],
      };
    case FEED_CONNECTION_MESSAGE:
      return {
        ...state,
        messages: action.payload.orders,
      };

    default:
      return state;
  }
};
