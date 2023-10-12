import React from "react";
import { createRoot } from "react-dom/client";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./js/services/reducers/rootReducer";
import { HashRouter } from "react-router-dom";
import App from "./js/components/App/App.jsx";
import api from "./js/utils/api";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { socketMiddleware } from "./js/services/actions/WebSocket";

import {
  START_FEED_CONNECTION,
  FEED_CONNECTION_SUCCESS,
  CLOSE_FEED_CONNECTION,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_MESSAGE,
  WS_ORDERS_HISTORY_CONNECTION_START,
  WS_ORDERS_HISTORY_CONNECTION_SUCCESS,
  WS_ORDERS_HISTORY_CONNECTIONCLOSED,
  WS_ORDERS_HISTORY_CONNECTION_ERROR,
  WS_ORDERS_HISTORY_CONNECTION_MESSAGE,
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
} from "./js/services/actions/actionTypes";

const wsFeedActions = {
  wsInit: START_FEED_CONNECTION,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: CLOSE_FEED_CONNECTION,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_CONNECTION_MESSAGE,
};

const wsOrdersHistoryActions = {
  wsInit: WS_ORDERS_HISTORY_CONNECTION_START,
  onOpen: WS_ORDERS_HISTORY_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  onError: WS_ORDERS_HISTORY_CONNECTION_ERROR,
  onMessage: WS_ORDERS_HISTORY_CONNECTION_MESSAGE,
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsFeedUrl = "wss://norma.nomoreparties.space/orders/all";
const wsOrdersHistoryUrl = "wss://norma.nomoreparties.space/orders";

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument(api),
      socketMiddleware(wsFeedUrl, wsFeedActions),
      socketMiddleware(wsOrdersHistoryUrl, wsOrdersHistoryActions)
    )
  )
);

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
