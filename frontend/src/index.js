import React from "react";
import ReactDOM from "react-dom";
import ThemeProvider from "./components/ThemeProvider";
import { Provider } from "react-redux";
import store from "./redux/Store";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
