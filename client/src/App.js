import React, { useEffect } from 'react'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import SignIn from './modules/SignIn'
import SignUp from './modules/SignUp'
import Home from './modules/Home'
import Dashboard from './modules/Dashboard/Dashboard'

import { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { GlobalProvider, GlobalContext } from './context/GlobalState'
import { connect } from 'react-redux';
// import { connect } from 'redux';

function App() {
  const { isAuth, loadUser } = useContext(GlobalContext);
  const history = useHistory();

  // useEffect(() => {

  // }, []);

  return (
    <Switch>
      <GlobalProvider>
        {/* <Route exact path="/dashboard">
          {isAuth ? <Dashboard /> : <Redirect to="/login" />} */}
        {/* component={Dashboard} context={GlobalContext} */}
        {/* </Route> */}
        <Route exact path="/dashboard" component={Dashboard} context={GlobalContext} />
        <Route exact path="/" component={Home} context={GlobalContext} />
        <Route path="/login" component={SignIn} context={GlobalContext} />
        <Route path="/register" component={SignUp} context={GlobalContext} />
      </GlobalProvider>
    </Switch>
  );
}

// function mapStateToProps(state) {
//   return { isAuth: state.isAuth }
// }

// export default connect(mapStateToProps)(App)

export default App;
