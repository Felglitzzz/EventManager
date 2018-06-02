import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import UserNavbar from '../Navbar/UserNavbar';
import AllUserEvents from '../Events/AllUserEvents';
import history from '../../helpers/history';
import EditEventPage from '../Events/EditEventPage';
import AllCentersPage from '../Centers/AllCentersPage';
import CreateCenterPage from '../Centers/CreateCenterPage';
import EditCenterPage from '../Centers/EditCenterPage';
import ViewCenterPage from '../Centers/ViewCenterPage';
import getUserFromToken from '../../utils/getUserFromToken';
import CreateEventPage from '../Events/CreateEventPage';
import Prompter from '../../helpers/Prompter';
import NotFound from '../NotFound/NotFound';
import { logOutUser } from '../../actions/userAccessActions';

/**
 * @description - Container class component for user's dashboard
 *
 * @class UserDashboard
 *
 * @extends {React.Component}
 */
class UserDashboard extends React.Component {
  /**
   * @description - creates an instance of UserDashboard
   *
   * @param { props } props - contains user dashboard component properties
   *
   * @memberof UserDashboard
   */
  constructor(props) {
    super(props);

    this.state = {
      event: [],
      options: [],
      userInfo: {},
      redirect: false,
      isAuthenticated: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * @description - handles removal of modal backdrop before the component mounts
   * and handles authentication for protected route
   *
   * @memberof UserDashboard
   *
   * @returns {void} Nothing
   */
  componentWillMount() {
    $(document).ready(() => {
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    });

    if (localStorage.getItem('x-access-token') === null) {
      return this.setState({ isAuthenticated: false });
    }
    this.setState({ isAuthenticated: true });
  }

  /**
   * @description - handles redirect to all events page
   *
   * @returns {void}
   */
  redirectToEvents() {
    history.push('/dashboard/events');
  }
  /**
   * @description handles logout event for a user
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleLogout(event) {
    event.preventDefault();
    localStorage.clear();
    this.props.logOutUser();
    Prompter.success('Logged Out Successfully');
    history.replace('/');
  }

  /**
   * @description - handles redirect to landing page
   *
   * @returns {void}
   */
  redirectToLandingPage() {
    Prompter.error('Only Logged in users can access the dashboard');
    return (
      <Redirect to = "/" />
    );
  }

  /**
   * @description - renders user's dashboard based
   *
   * @returns {jsx} userEvent component
   */
  render() {
    const { isAuthenticated } = this.state;
    const { isAdmin, error } = getUserFromToken();
    return (
      !isAuthenticated || error
        ?
        this.redirectToLandingPage()
        :
        <div>
          <UserNavbar />
          <div className="wrapper top-order"
            id="wrapper"
          >
            <div className="sidebar bg-dark h-100" >
              <div>
                <div>
                  <ul className="nav list-group bg-light"
                    id="menu"
                  >
                    <Link
                      to = "/dashboard"
                    >
                      <li className="text-orange bg-dark waves-effect sidenav-title padL">
                        <i className="text-center fab fa-quinscape fa-2x" />
                        <p className="font-weight-bold text-orange lead">EVENTERIA</p>
                      </li>
                    </Link>
                    { isAdmin ? (null) : <Link
                      to={'/dashboard/centers'}
                    >
                      <li className="list-group-item bg-dark mb-1 button-anim padL py-4">
                        <span className="fa-stack mr-2 empty">
                          <i className="text-center text-orange fa fa-university fa-2x" />
                        </span>
                        <p className="font-weight-bold text-orange lead d-inline-flex">
                          Centers
                        </p>
                      </li>
                    </Link>}
                    <Link
                      to ={isAdmin ? '/dashboard/centers' : '/dashboard/events'}
                    >
                      <li className="list-group-item bg-dark mb-1 button-anim padL py-4">
                        <span className="fa-stack mr-2 empty">
                          <i className="text-center text-orange fa fa-folder-open fa-2x" />
                        </span>
                        <p className="font-weight-bold text-orange lead d-inline-flex">{isAdmin ? 'My Centers' : 'My Events'}</p>
                      </li>
                    </Link>
                    <Link
                      to={isAdmin ? '/dashboard/center' : '/dashboard/event'}
                    >
                      <li className="list-group-item bg-dark mb-1 button-anim padL py-4">
                        <span className="fa-stack mr-2 empty">
                          <i className="text-center text-orange fa fa-plus-square fa-2x" />
                        </span>
                        <p className="font-weight-bold text-orange lead d-inline-flex">{isAdmin ? 'Create Centers' : 'Create Events'}</p>
                      </li>
                    </Link>
                    <li className="list-group-item text-orange mb-1 bg-dark button-anim padL py-4"
                      onClick={this.handleLogout}
                    >
                      <span className="fa-stack mr-2 empty">
                        <i className="text-center text-orange fa fa-power-off fa-2x" />
                      </span>
                      <p className="font-weight-bold text-orange lead d-inline-flex">Logout</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="main-panel">
              <Switch>
                <Route
                  component={CreateEventPage}
                  exact
                  path="/dashboard/event"
                />
                <Route
                  component={AllUserEvents}
                  exact
                  path="/dashboard/events"
                />
                { isAdmin ? <Route
                  component={AllCentersPage}
                  exact
                  path="/dashboard"
                />
                  :
                  <Route
                    component={AllUserEvents}
                    exact
                    path="/dashboard"
                  /> }
                <Route
                  component={EditEventPage}
                  exact
                  path="/dashboard/events/:eventId"
                />
                <Route
                  component={AllCentersPage}
                  exact
                  path="/dashboard/centers"
                />
                <Route
                  component={CreateCenterPage}
                  path="/dashboard/center"
                />
                <Route
                  component={EditCenterPage}
                  exact
                  path="/dashboard/centers/:centerId"
                />
                <Route
                  component={ViewCenterPage}
                  exact
                  path="/dashboard/centers/view/:centerId"
                />
                <Route
                  component={NotFound}
                  exact
                  path="*"
                />
              </Switch>
            </div>
          </div>
        </div>
    );
  }
}

UserDashboard.propTypes = {
  isAuthenticated: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired
};

/**
 * @description maps redux state to props
 *
 * @param { object } state - holds redux state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  isAuthenticated: state.userAccess,
});

/**
 * @description maps action dispatched to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
function mapDispatchToProps(dispatch) {
  return {
    logOutUser: () => dispatch(logOutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
