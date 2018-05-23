import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import UserDashboard from './components/Dashboard/UserDashboard';
import history from './helpers/history';
import Fourohfour from './components/Centers/Fourohfour/Fourohfour';


const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route component={App}
        exact
        path="/" />
      <Route component={UserDashboard}
        path="/dashboard" />
      <Route component={Fourohfour}
        path="*" />
    </Switch>
  </Router>
);

export default Routes;
