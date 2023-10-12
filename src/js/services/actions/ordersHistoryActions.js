import {
  WS_ORDERS_HISTORY_CONNECTION_START,
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
} from "./actionTypes";

export const startOrdersHistoryConnection = (accessToken) => {
  return {
    type: WS_ORDERS_HISTORY_CONNECTION_START,
    accessToken,
  };
};

export const closeOrdersHistoryConnection = () => {
  return {
    type: WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  };
};
