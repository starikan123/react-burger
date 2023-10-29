import { Middleware } from "redux";
import { RootState } from "../types";
import { TWSActionTypes } from "../actions/wsActionTypes";

export const socketMiddleware: Middleware<{}, RootState> = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action: TWSActionTypes) => {
    const { dispatch } = store;
    const { type, payload } = action;

    switch (type) {
      case "WS_CONNECTION_START":
        if (socket === null) {
          const { wsUrl } = action.payload;
          socket = new WebSocket(wsUrl);
          socket.onopen = (event) => {
            dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
          };

          socket.onerror = (event) => {
            dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
          };

          socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            dispatch({ type: "WS_GET_MESSAGE", payload: parsedData });
          };

          socket.onclose = (event) => {
            dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
            socket = null;
          };
        }
        break;

      case "WS_SEND_MESSAGE":
        if (socket && socket.readyState === WebSocket.OPEN) {
          const { message } = action.payload;
          socket.send(JSON.stringify(message));
        }
        break;

      case "WS_CONNECTION_CLOSED":
        if (socket) {
          socket.close();
          socket = null;
        }
        break;

      default:
        next(action);
    }
  };
};
