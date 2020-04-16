import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Operator from "./components/QueueList/Operator";
import Student from "./components/QueueList/Student";
import StudentsSession from "./components/CurrentSession/Student/StudentsSession";
import OperatorsSession from "./components/CurrentSession/Operator/OperatorsSession";

import { AuthProvider, AuthContext } from "./context/Auth/AuthState";
import {
  SessionsProvider,
  SessionsContext,
} from "./context/Sessions/SessionsState";
import { UsersProvider, UsersContext } from "./context/Users/UsersState";
import { QueueProvider, QueueContext } from "./context/Queue/QueueState";

export default function App() {
  // const { loadUser, isAuth } = useContext(AuthContext);

  // useEffect(() => {
  //   loadUser().then(() => {
  //     if (!isAuth) {
  //       // history.push("/login");
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuth]);

  return (
    <Switch>
      <QueueProvider>
        {/* <AuthProvider> */}
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
              component={StudentsSession}
              context={(AuthContext, QueueContext)}
            />
            <Route
              path="/operator/current-session"
              component={OperatorsSession}
              context={(AuthContext, QueueContext)}
            />
          </SessionsProvider>
        </UsersProvider>
        {/* </AuthProvider> */}
      </QueueProvider>
    </Switch>
  );
}

// export default App;
