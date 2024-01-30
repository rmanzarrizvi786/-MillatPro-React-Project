import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTopLink from "components/ScrollToTopLink/ScrollToTopLink";
import { HashRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./reduxStore/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ScrollToTopLink/>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
