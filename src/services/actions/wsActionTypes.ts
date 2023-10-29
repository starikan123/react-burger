export interface IWSMessagePayload {
  orders: any[];
  total: number | null;
  totalToday: number | null;
}

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";

interface WSConnectionStartAction {
  type: typeof WS_CONNECTION_START;
  payload: {
    wsUrl: string;
  };
}

interface WSConnectionSuccessAction {
  type: typeof WS_CONNECTION_SUCCESS;
}

interface WSConnectionErrorAction {
  type: typeof WS_CONNECTION_ERROR;
  payload: Event;
}

interface WSConnectionClosedAction {
  type: typeof WS_CONNECTION_CLOSED;
}

interface WSGetMessageAction {
  type: typeof WS_GET_MESSAGE;
  payload: IWSMessagePayload;
}

interface WSSendMessageAction {
  type: typeof WS_SEND_MESSAGE;
  payload: {
    message: any;
  };
}

export type TWSActionTypes =
  | WSConnectionStartAction
  | WSConnectionSuccessAction
  | WSConnectionErrorAction
  | WSConnectionClosedAction
  | WSGetMessageAction
  | WSSendMessageAction;
