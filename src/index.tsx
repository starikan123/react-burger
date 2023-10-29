import React from "react";
import "./index.css";
import App from "./components/App/App";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { createRoot } from "react-dom/client";
import RootReducer from "./services/reducers/RootReduser";
import { RootState } from "./services/types";
import { ThunkAction } from "redux-thunk";

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware))
);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

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
