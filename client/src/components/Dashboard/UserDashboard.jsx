import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import toastr from 'toastr';
// import { Sidebar, Menu, Icon } from 'semantic-ui-react';

import UserNavbar from '../Navbar/UserNavbar';
// import NavHeader from '../NavHeader/NavHeader';
import AllUserEvents from '../Events/AllUserEvents';
// import { loadAllEvent } from '../../actions/eventActions';
// import { loadCenters } from '../../actions/centerActions';
import history from '../../helpers/history';
import CreateEventForm from '../Events/CreateEventForm';
import EditEventPage from '../Events/EditEventPage';
import AllCentersPage from '../Centers/AllCentersPage';
import CreateCenterPage from '../Centers/CreateCenterPage';
import EditCenterPage from '../Centers/EditCenterPage';
import ViewCenterPage from '../Centers/ViewCenterPage';

// require('../../../public/_sidebar.scss');
/**
 * class UserDashboard
 */
class UserDashboard extends React.Component {
  /**
   * constructor function
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      event: [],
      options: [],
      redirect: false,
      isAuthenticated: false
    };

    // this.redirectToCreate = this.redirectToCreate.bind(this);
    // this.redirectToEdit = this.redirectToEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  /**
   * @returns {object} removed modal backdrop
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
   * @returns {void}
   */
  redirectToEvents() {
    history.push('/dashboard/events');
  }
  /**
   * handles logout
   * @param {object} event
   * @returns {void}
   */
  handleLogout(event) {
    event.preventDefault();
    localStorage.clear();
    toastr.success('Logged Out Successfully');
    history.replace('/');
  }

  /**
   * @returns { react } dashboard component
   */
  render() {
    const { isAuthenticated } = this.state;
    const { isAdmin } = this.props.userInfo;
    return (
      !isAuthenticated
        ?
        toastr.error('Only Logged In Users can access the dashboard')
        &&
        <Redirect to = "/" />
        :
        <div>
          <div className="wrapper">
            <div className="sidebar bg-dark">
              <div className="sidebar-wrapper">
                <div className="my-3">
                  <ul className="nav list-group bg-dark">
                    <li className="list-group-item bg-dark" />
                    <Link
                      to = "/dashboard">
                      <li className="list-group-item text-orange bg-dark">
                        <i className="text-center fa fa-tachometer fa-2x" />
                        <p className="font-weight-bold text-orange montfont">EVENTMANAGER</p>
                      </li>
                    </Link>
                    <Link
                      to ={isAdmin ? '/dashboard/centers' : '/dashboard/events'}>
                      <li className="list-group-item bg-dark waves-effect"
                        type="button">
                        <i className="text-center text-orange fa fa-folder-open fa-2x" />
                        <p className="font-weight-bold text-orange montfont">{isAdmin ? 'My Centers' : 'My Events'}</p>
                      </li>
                    </Link>
                    <Link
                      to={isAdmin ? '/dashboard/create-center' : '/dashboard/create-event'}>
                      <li className="list-group-item bg-dark waves-effect"
                        type="button">
                        <i className="text-center text-orange fa fa-plus-square fa-2x" />
                        <p className="font-weight-bold text-orange montfont">{isAdmin ? 'Create Centers' : 'Create Events'}</p>
                      </li>
                    </Link>
                    <li className="list-group-item  text-orange bg-dark waves-effect"
                      type="button"
                      onClick={this.handleLogout}>
                      <i className="text-center text-orange fa fa-power-off fa-2x" />
                      <p className="font-weight-bold text-orange montfont">Logout</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="main-panel">
              <UserNavbar/>
              <Switch>
                <Route
                  path="/dashboard/create-event"
                  component={CreateEventForm}
                />
                <Route
                  path="/dashboard/events"
                  exact
                  component={AllUserEvents}
                />
                <Route
                  path="/dashboard/events/:eventId"
                  component={EditEventPage}
                />
                <Route
                  path="/dashboard/centers"
                  component={AllCentersPage}
                  exact
                />
                <Route
                  path="/dashboard/create-center"
                  component={CreateCenterPage}
                />
                <Route
                  path="/dashboard/centers/:centerId"
                  component={EditCenterPage}
                />
                <Route
                  path="/dashboard/view-center/:centerId"
                  component={ViewCenterPage}
                />
              </Switch>
            </div>
          </div>
        </div>
    );
  }
}

UserDashboard.propTypes = {
  userInfo: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired
};

/**
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} loadedEvents
 */
const mapStateToProps = state => ({
  userInfo: state.userAccess.loginData.user,
  isAuthenticated: state.userAccess
});

export default connect(mapStateToProps)(UserDashboard);
