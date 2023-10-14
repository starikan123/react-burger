export const socketMiddleware = () => {
  let socket = null;
  let isSocketOpen = false;

  return (store) => (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type === "WS_CONNECTION_START" && !isSocketOpen) {
      const { wsUrl } = payload;
      socket = new WebSocket(wsUrl);
      socket.onopen = (event) => {
        dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        isSocketOpen = true; // Set isSocketOpen to true when the connection is open.
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
        isSocketOpen = false; // Set isSocketOpen to false when the connection is closed.
      };
    }

    if (type === "WS_SEND_MESSAGE" && isSocketOpen) {
      const message = payload;
      socket.send(JSON.stringify(message));
    }

    if (type === "WS_CONNECTION_CLOSED" && isSocketOpen) {
      socket.close();
      isSocketOpen = false;
    }

    next(action);
  };
};
