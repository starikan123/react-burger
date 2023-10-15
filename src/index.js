import React from "react";
import "./index.css";
import App from "./components/App/App";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./services/reducers/RootReduser";
import { Provider } from "react-redux";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { createRoot } from "react-dom/client";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware()))
);

const rootElement = document.getElementById("root");

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

const root = createRoot(rootElement);
root.render(app);
