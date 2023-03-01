import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/root/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import { Provider } from "react-redux";
import store from "../src/redux/reducers/config";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route exact path="*" element={<App />} />
        <Route path="/" element={<Navigate from="/" to="/posts" />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);