import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import UserDashboard from './components/Dashboard/UserDashboard';
import history from './helpers/history';


const Routes = () => (
        <Router history={history}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/dashboard" component={UserDashboard} />
                </Switch>
        </Router>
);

export default Routes;
