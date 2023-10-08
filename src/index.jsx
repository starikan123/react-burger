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

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
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
