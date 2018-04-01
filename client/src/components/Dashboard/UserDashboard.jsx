import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import toastr from 'toastr';

import UserNavbar from '../Navbar/UserNavbar';
// import NavHeader from '../NavHeader/NavHeader';
import AllUserEvents from '../Events/AllUserEvents';
// import { deleteOneEvent } from '../../actions/eventActions';
import history from '../../helpers/history';
import CreateEventForm from '../Events/CreateEventForm';
import EditEventPage from '../Events/EditEventPage';
import AllCentersPage from '../Centers/AllCentersPage';
import CreateCenterPage from '../Centers/CreateCenterPage';
import EditCenterPage from '../Centers/EditCenterPage';
import ViewCenterPage from '../Centers/ViewCenterPage';
import showDeleteModal from '../Modal/alertModal';
// import { loadOneUser } from '../../actions/userAccessActions';
import getUserInfo from '../../utils/getUserFromToken';

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
      userInfo: {},
      redirect: false,
      isAuthenticated: false,
    };
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

  // handleDelete(){
  //   event.preventDefault();


  // }

  /**
   * @returns { react } dashboard component
   */
  render() {
    const { isAuthenticated } = this.state;
    const { isAdmin, error } = getUserInfo();
    return (
      !isAuthenticated || error
        ?
        toastr.error('Only Logged in users can access the dashboard')
        &&
        <Redirect to = "/" />
        :
        <div>
          {/* <ConfirmationModal /> */}
          <div className="wrapper top-order">
            <div className="sidebar bg-dark h-100">
              <div className="sidebar-wrapper h-100">
                <div>
                  <ul className="nav list-group bg-light">
                    <Link
                      to = "/dashboard">
                      <li className="text-orange bg-dark waves-effect pl-4 pb-3 mb-1">
                        <i className="text-center fa fa-tachometer fa-2x" />
                        <p className="font-weight-bold text-orange montfont">EVENTMANAGER</p>
                      </li>
                    </Link>
                    {}
                    <Link
                      to ={isAdmin ? '/dashboard/centers' : '/dashboard/events'}>
                      <li className="list-group-item bg-dark mb-1 button-anim">
                        <i className="text-center text-orange fa fa-folder-open fa-2x" />
                        <p className="font-weight-bold text-orange montfont">{isAdmin ? 'My Centers' : 'My Events'}</p>
                      </li>
                    </Link>
                    <Link
                      to={isAdmin ? '/dashboard/create-center' : '/dashboard/create-event'}>
                      <li className="list-group-item bg-dark mb-1 button-anim">
                        <i className="text-center text-orange fa fa-plus-square fa-2x" />
                        <p className="font-weight-bold text-orange montfont">{isAdmin ? 'Create Centers' : 'Create Events'}</p>
                      </li>
                    </Link>
                    <li className="list-group-item text-orange mb-1 bg-dark button-anim"
                      onClick={this.handleLogout}>
                      <i className="text-center text-orange fa fa-power-off fa-2x" />
                      <p className="font-weight-bold text-orange montfont">Logout</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="main-panel">
              <UserNavbar />
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
                { isAdmin ? <Route
                  path="/dashboard"
                  exact
                  component={AllCentersPage}/>
                  :
                  <Route
                    path="/dashboard"
                    exact
                    component={AllUserEvents}
                  /> }
                <Route
                  path="/dashboard/events/:eventId"
                  exact
                  component={EditEventPage}
                />
                <Route
                  path="/dashboard/events/:eventId"
                  exact
                  component={showDeleteModal}
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
                  path="/dashboard/centers/edit/:centerId"
                  component={EditCenterPage}
                />
                <Route
                  path="/dashboard/center/view/:centerId"
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
  isAuthenticated: PropTypes.object.isRequired,
};

// /**
//  * @param {object} state
//  * @param {object} ownProps
//  * @returns {object} loadedEvents
//  */
const mapStateToProps = state => ({
  isAuthenticated: state.userAccess,
});

export default connect(mapStateToProps)(UserDashboard);
