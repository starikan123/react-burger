export const socketMiddleware = () => {
  let socket = null;

  return (store) => (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;

    switch (type) {
      case "WS_CONNECTION_START":
        if (socket === null) {
          const { wsUrl } = payload;
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
          const message = payload;
          socket.send(JSON.stringify(message));
        }
        break;

      case "WS_CONNECTION_CLOSE":
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
