import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./modules/Auth/Login";
import Register from "./modules/Auth/Register";
import Dashboard from "./modules/Dashboard/Dashboard";
import Management from "./modules/Management/Management";
import CurrentSession from './modules/Management/CurrentSession/CurrentSession'

import { AuthProvider, AuthContext } from "./context/Auth/AuthState";
import { SessionsProvider, SessionsContext } from "./context/Sessions/SessionsState"
import { UsersProvider, UsersContext } from "./context/Users/UsersState"

import SocketProvider from "./context/SocketContext/context";

function App() {
  return (
    <Switch>
      <AuthProvider>
        <Route path="/login" component={Login} context={AuthContext} />
        <Route path="/register" component={Register} context={AuthContext} />
        <SessionsProvider>
          <UsersProvider>
            <Route exact path="/" component={Dashboard} context={AuthContext} />
            <Route
              path="/dashboard"
              component={Dashboard}
              context={AuthContext}
            />
            {/* <SocketProvider> */}
            <Route path="/management/current-session" component={CurrentSession} context={AuthContext, SessionsContext, UsersContext} />
            {/* </SocketProvider> */}
            <Route exact path="/management" component={Management} context={AuthContext, SessionsContext, UsersContext} />
          </UsersProvider>
        </SessionsProvider>
      </AuthProvider>
    </Switch>
  );
}

export default App;
