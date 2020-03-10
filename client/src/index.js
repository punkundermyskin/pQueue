import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import App from "./App";
// import "./App.css";

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};

render(

  <AlertProvider template={AlertTemplate} {...options}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiPickersUtilsProvider>,
  </AlertProvider>,
  document.querySelector("#root")
);
