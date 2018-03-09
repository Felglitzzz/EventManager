import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import UserDashboard from './components/Dashboard/UserDashboard';
// import CreateEventForm from './components/Events/CreateEventForm';
// import AllUserEvents from './components/Events/AllUserEvents';
// import EditEventPage from './components/Events/EditEventPage';
import history from './helpers/history';


const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={UserDashboard} />
      {/* <Route path="/create-event" component={CreateEventForm} /> */}
      {/* <Route path="/created" component={AllUserEvents} /> */}
      {/* <Route path="/dashboard/events/:eventId" component={EditEventPage} /> */}
    </Switch>
  </Router>
);

export default Routes;
