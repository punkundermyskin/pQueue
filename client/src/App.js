import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Operator from "./components/QueueList/Operator";
import Student from "./components/QueueList/Student";
import CurrentSession from "./components/CurrentSession";
import TV from "./components/CurrentSession/TV";

import { AuthProvider, AuthContext } from "./context/Auth/AuthState";
import {
  SessionsProvider,
  SessionsContext,
} from "./context/Sessions/SessionsState";
import { UsersProvider, UsersContext } from "./context/Users/UsersState";
import { QueueProvider, QueueContext } from "./context/Queue/QueueState";

function App() {
  return (
    <Switch>
      <QueueProvider>
        <AuthProvider>
          <UsersProvider>
            <SessionsProvider>
              <Route
                exact
                path="/"
                component={Dashboard}
                context={AuthContext}
              />
              <Route
                path="/dashboard"
                component={Dashboard}
                context={AuthContext}
              />
              <Route path="/login" component={Login} context={AuthContext} />
              <Route
                path="/register"
                component={Register}
                context={AuthContext}
              />
              <Route
                exact
                path="/student"
                component={Student}
                context={(AuthContext, SessionsContext, QueueContext)}
              />
              <Route
                exact
                path="/operator"
                component={Operator}
                context={
                  (AuthContext, SessionsContext, UsersContext, QueueContext)
                }
              />
              <Route
                path="/student/current-session"
                component={CurrentSession}
                context={(AuthContext, QueueContext)}
              />
              <Route
                path="/operator/current-session"
                component={CurrentSession}
                context={(AuthContext, QueueContext)}
              />
              <Route
                exact
                path="/watch"
                component={TV}
                context={(QueueContext)}
              />
            </SessionsProvider>
          </UsersProvider>
        </AuthProvider>
      </QueueProvider>
    </Switch>
  );
}

export default App;
