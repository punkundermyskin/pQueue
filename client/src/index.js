import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import App from "./App";

import { AuthProvider, AuthContext } from "./context/Auth/AuthState";
// import "./App.css";

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: "10px",
  // you can also just use 'scale'
  transition: transitions.FADE,
};

render(
  <AlertProvider template={AlertTemplate} {...options}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <AuthProvider>
          <App context={AuthContext} />
        </AuthProvider>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
    ,
  </AlertProvider>,
  document.querySelector("#root")
);
