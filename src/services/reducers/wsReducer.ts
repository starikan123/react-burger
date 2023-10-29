import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  TWSActionTypes,
  IWSMessagePayload,
} from "../actions/wsActionTypes";

interface IWSState {
  wsConnected: boolean;
  orders: any[];
  total: number | null;
  totalToday: number | null;
  error?: Event;
}

const initialState: IWSState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsReducer = (
  state = initialState,
  action: TWSActionTypes
): IWSState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      const { orders, total, totalToday } = action.payload as IWSMessagePayload;
      return {
        ...state,
        error: undefined,
        orders,
        total,
        totalToday,
      };

    default:
      return state;
  }
};
