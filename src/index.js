import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { theme } from './theme'
import { BrowserRouter } from "react-router-dom";
import store from '../src/redux/store'

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Provider store={store}>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
