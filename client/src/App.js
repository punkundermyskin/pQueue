import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from './modules/SignIn'
import SignUp from './modules/SignUp'
import Home from './modules/Home'
import Dashboard from './modules/Dashboard/Dashboard'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
}

export default App;
