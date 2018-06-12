import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import UserDashboard from './components/Dashboard/UserDashboard';
import history from './helpers/history';
import NotFound from './components/NotFound/NotFound';


const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route component={App}
        exact
        path="/" />
      <Route component={UserDashboard}
        path="/dashboard" />
      <Route component={NotFound}
        path="*" />
    </Switch>
  </Router>
);

export default Routes;
