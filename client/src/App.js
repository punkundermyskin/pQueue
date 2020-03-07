import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './modules/Auth/Login'
import Register from './modules/Auth/Register'
import Dashboard from './modules/Dashboard/Dashboard'
import Session from './modules/Session/Session'

import { GlobalProvider, GlobalContext } from './context/GlobalState'

function App() {

  return (
    <Switch>
      <GlobalProvider>
        <Route exact path="/" component={Dashboard} context={GlobalContext} />
        {/* <Route path="/login" component={SignIn} context={GlobalContext} /> */}
        <Route path="/login" component={Login} context={GlobalContext} />
        <Route path="/register" component={Register} context={GlobalContext} />
        <Route path="/dashboard" component={Dashboard} context={GlobalContext} />
        <Route path="/session" component={Session} context={GlobalContext} />
      </GlobalProvider>
    </Switch>
  );
}

export default App;
