import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from './modules/Auth/SignIn'
import SignUp from './modules/Auth/SignUp'
import Dashboard from './modules/Dashboard/Dashboard'

import { GlobalProvider, GlobalContext } from './context/GlobalState'

function App() {

  return (
    <Switch>
      <GlobalProvider>
        <Route path="/dashboard" component={Dashboard} context={GlobalContext} />
        <Route exact path="/" component={Dashboard} context={GlobalContext} />
        <Route path="/login" component={SignIn} context={GlobalContext} />
        <Route path="/register" component={SignUp} context={GlobalContext} />
      </GlobalProvider>
    </Switch>
  );
}

export default App;
