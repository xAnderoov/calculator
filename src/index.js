import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const INITIAL_STATE = {
  firstOperand: 0,
  secondOperand: null,
  operation: null,
  isFloat: false,
};

ReactDOM.render(
  <React.StrictMode>
    <App initialState={INITIAL_STATE}/>
  </React.StrictMode>,
  document.getElementById("root")
);
