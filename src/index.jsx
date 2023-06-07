import React from "react";
import { createRoot } from "react-dom/client";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./js/services/reducers/rootReducer";
import Api from "./js/utils/api";
import { HashRouter } from "react-router-dom";
import App from "./js/components/App/App.jsx";

const baseUrl = "https://norma.nomoreparties.space/api";
const api = new Api(baseUrl);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
