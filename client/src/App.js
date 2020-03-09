import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./modules/Auth/Login";
import Register from "./modules/Auth/Register";
import Dashboard from "./modules/Dashboard/Dashboard";
import Management from "./modules/Session/Management";

import { AuthProvider, AuthContext } from "./context/AuthState";
import { SessionsProvider, SessionsContext } from "./context/SessionsState"

function App() {
  return (
    <Switch>
      <AuthProvider>
        <Route exact path="/" component={Dashboard} context={AuthContext} />
        <Route path="/login" component={Login} context={AuthContext} />
        <Route path="/register" component={Register} context={AuthContext} />
        <Route
          path="/dashboard"
          component={Dashboard}
          context={AuthContext}
        />
        <SessionsProvider>
          <Route path="/management" component={Management} context={AuthContext, SessionsContext} />
        </SessionsProvider>
      </AuthProvider>
    </Switch>
  );
}

export default App;
